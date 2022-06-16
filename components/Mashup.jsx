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
    //combinePlaylists();
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

  async function combinePlaylists() {
    // Combine playlists here
  }

  async function createPlaylist() {
    // Create new playlist here 
  }

  async function addToPlaylist() {
    // Add songs to playlist here
  }

  async function goToPlaylist() {
    const access_token = Cookies.get('token')
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