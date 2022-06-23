import { useRouter } from 'next/router';
import {
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

const Mashup = ({ lists, user }) => {

  const router = useRouter();
  const hover = useColorModeValue(true, false);

  async function generatePlaylist() {
    const token = Cookies.get('token');
    const trackLists = await fetchTracks(lists, token);
    const matches = (findMatches(trackLists));
    const uniqueTrackLists = removeDuplicates(trackLists, matches);
    const finalTrackList = combinePlaylists(uniqueTrackLists, matches);
    const playlist = await createPlaylist(user, token);
    await sendToPlaylist(playlist.id, finalTrackList , token);
    goToPlaylist(playlist.url);
  }

  //get individual playlist
  async function fetchPlaylist(listname, offset, token) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${listname}/tracks?offset=${offset}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const tracks = await response.json();
    return tracks;
  }

  //get all tracks from selected playlists
  async function fetchTracks(lists, token) {
    const playlists = [];
    await Promise.all(lists.map(async (list) => {
      let tracks = [];
      const count = [...Array(Math.ceil(list.tracks.total / 100))].map((_, i) => i * 100);
      await Promise.all(count.map(async (offset) => {
        let data = await fetchPlaylist(list.id, offset, token);
        data.items.map((item)=> {
          tracks.push(item.track.uri);
        })
      }))
      playlists.push(tracks);
    }))
    return playlists;
  }

  //find tracks that match
  function findMatches(list) {
    let matches = list.reduce((a, b) => a.filter(c => b.includes(c)));
    return matches;
  }

  //remove matches from original list
  function removeDuplicates(lists, matches) {
    let uniqueLists = []
    lists.forEach(list => {
      uniqueLists = [...uniqueLists, list.filter(x => !matches.includes(x))];
    })
    return uniqueLists
  }

  //combine the playlists randomly
  function combinePlaylists(lists, matches) {
  let finalList = matches;
    first:
    while (true) {
        for (let list of lists){
            const index = Math.floor(Math.random() * list.length);
            const track = list[index];
            finalList.push(track);
            list.splice(index, 1);
        }
        //check if list is empty and break
        for (let list of lists) {
          if (list.length === 0) {
          break first;
        }
      }
    }
    return finalList
  }

  //create the new playlist
  async function createPlaylist(user, access_token) {
    const response = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + access_token
        },
        body: JSON.stringify({
            "name": "test",
            "description": "Created by Playlist Mashup",
            "public": true
        })
    })
    const data = await response.json();
    const playlist = {
      url: data.external_urls.spotify,
      id: data.id
    }
    return playlist
  }

  //add songs to playlist
  async function addToPlaylist(id, tracks, access_token){
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: 'POST',
      headers: {
          "Authorization": "Bearer " + access_token
      },
      body: JSON.stringify({ "uris": tracks })
    })
  }

  //send multiple requests if more than 100 songs to be added
  async function sendToPlaylist(id, tracks, access_token) {
    const repeat = Math.ceil(tracks.length / 100)
    let i = 0
      while (i < (repeat - 1)) {
        await addToPlaylist(id, tracks.slice(i * 100, (i + 1) * 100), access_token)
        i++
      }
    await addToPlaylist(id, tracks.slice(i * 100, tracks.length), access_token)
  } 

  //go to finished playlist
  async function goToPlaylist(playlistUrl) {
    router.push(playlistUrl)
  }

    return (
      <Button 
      rounded="full"
      w="33%" 
      color="black"
      bgColor="#1dd760"
      onClick={generatePlaylist}
      transition="all 0.3s"
        _hover={hover ? {
          bgColor: "#21eb69",
        } :
        {
          bgColor: "#17a349",
        }}
        _active={{
          borderColor: "gray.200",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
      Mashup
      </Button>
    )
  }

  export default Mashup;