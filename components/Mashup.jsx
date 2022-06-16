import { useRouter } from "next/router";
import {
  Button,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

const Mashup = ({ lists, user }) => {

  const router = useRouter();

  async function generatePlaylist() {
    const token = Cookies.get('token')
    const trackList = await fetchTracks(lists, token)
    let newTrackList = findMatches(trackList)
    //findShortest();
    //combinePlaylists();
    //removeDuplicates();
    //createPlaylist();
    //addToPlaylist();
    
    //goToPlaylist();
  }

  async function fetchPlaylist(listname, offset, token) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${listname}/tracks?offset=${offset}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const tracks = await response.json()
    return tracks
  }
  
  async function fetchTracks(lists, token) {
    const playlists = []
    await Promise.all(lists.map(async (list) => {
      let tracks = []
      const count = [...Array(Math.ceil(list.tracks.total / 100))].map((_, i) => i * 100);
      await Promise.all(count.map(async (offset) => {
        let data = await fetchPlaylist(list.id, offset, token);
        data.items.map((item)=> {
          tracks.push(item.track.uri)
        })
      }))
      playlists.push(tracks)
    }))
    return playlists
  }

  function findMatches(list) {
    let matches = list.reduce((a, b) => a.filter(c => b.includes(c)))
    return matches
  }

  async function findShortest() {
    //Find the length of the shortest playlist and assign to variable
    /*const lengths = []
    let minLength
     Minimum length and randomly shuffle
    for (x in combinedPlaylists) {
        lengths.push(combinedPlaylists[x].length)
        minLength = Math.min(...lengths)
    }*/
  }

  async function combinePlaylists() {
    //combine the playlists randomly, removing from combinedPlaylists so no doubles
    /*let i = 0
    while (i < minLength) {
        for (x in combinedPlaylists) {
            const index = Math.floor(Math.random() * combinedPlaylists[x].length)
            trackList.push(combinedPlaylists[x][index])
            combinedPlaylists[x].splice(index, 1)
        }
        i++
    }*/
  }

  async function removeDuplicates() {
    // Remove any duplicates
    //const uniqueTrackList = [...new Set(trackList)]
  }

  async function createPlaylist() {
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
    const data = await response.json()
    const playlistUrl = data.external_urls.spotify
    return playlistUrl
} 

  async function addToPlaylist() {
    //function to add new songs to the new playlist with spotify API
  /*

      async function sendToPlaylist(){
    await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
          "Authorization": "Bearer " + access_token
      },
      body: JSON.stringify({ "uris": tracks })
    })
  }

    //make multiple requests if more than 100 songs to be added
    //addToPlaylist(playlistID, tracks.slice(0, 100))

    const repeat = Math.ceil(tracks.length / 100)
    let i = 0
    while (i < (repeat - 1)) {
        await addToPlaylist(playlistID, tracks.slice(i * 100, (i + 1) * 100))
        i++
    }
    await addToPlaylist(playlistID, tracks.slice(i * 100, tracks.length))
    document.querySelector("#generating").style.display = "none"
    document.querySelector("#generating-text").style.display = "none"
    window.location = playlistURL
    */
  }

  async function goToPlaylist(playlistUrl) {
    router.push(playlistUrl)
  }

    return (
      <Button 
      rounded="full"
      w="33%" 
      colorScheme='gray'
      onClick={generatePlaylist}
      >
      Mashup
      </Button>
    )
  }

  export default Mashup;