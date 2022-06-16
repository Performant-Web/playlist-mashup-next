import React from "react";
import {
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Box,
  Button,
  ButtonGroup
} from "@chakra-ui/react";
import Header from '/components/Header.jsx';
import Layout from '/components/Layout.jsx';
import SinglePlaylist from '/components/SinglePlaylist.jsx';
import Mashup from '/components/Mashup.jsx';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [user , setUser] = useState(Cookies.get('user'));
    const [playlists , setPlaylists] = useState()
    const [selectedPlaylists, setSelectedPlaylists] = useState([])

    function selectHandler(playlist) {
      if (!selectedPlaylists.includes(playlist)) {
          setSelectedPlaylists(selectedPlaylists => selectedPlaylists.concat(playlist));
        }
      if (selectedPlaylists.includes(playlist)) {
        setSelectedPlaylists(selectedPlaylists.filter(list => list !== playlist))
      }
    }

    useEffect(()=>{
      const access_token = Cookies.get('token')
      getPlaylists(user)
      async function getPlaylists(user) {
        const response = await fetch(`https://api.spotify.com/v1/users/${user}/playlists?limit=50`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + access_token
            }
        })
        const data = await response.json()
        const playlists = data.items
        setPlaylists(playlists)
        return playlists
      }
    },[user])

    const handleSubmit = async (event) => {
      event.preventDefault()
      setUser(event.target.user.value)
    }

    function clear() {
      setSelectedPlaylists([])
    }
  
  return (
    <>
      <Header auth={true}/>
      <Layout>
        <Box
          display="flex"
          flexDirection="column"
          h="80vh"
          sx={{
            '@media only screen and (max-width: 62em)': {
              height: 'calc(100vh - 72px)',
            },
          }}
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          py={{ base: 5, lg: 10}}
          rounded={[null, "md"]}
          shadow="base"
          >
          <Box>
            <chakra.form
              method="POST"
              onSubmit={handleSubmit}
              mb={{ base: 5, lg: 10}}
              px={{ base: 4, lg: 10}}
            >
              <Stack
                spacing={6}
              >
                <FormControl
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.100",
                    }}
                  >
                    Search by Spotify Username
                  </FormLabel>
                  <InputGroup size="sm">
                    <Input
                      name="user"
                      id="user"
                      defaultValue={user}
                      focusBorderColor="gray.400"
                      rounded="md"
                      w="100%"
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </chakra.form>
          </Box>
          <Box 
            h="40vh"
            overflowY="scroll"
            sx={{
              '&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '8px',
              backgroundColor: `rgba(125, 125, 125, 0.1)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
              borderRadius: '8px',
            },
          }}
            display="flex"
            flexDirection="column"
            px={{ base: 4, lg: 10}}
            mb={{ base: 5, lg: 10}}
          >
          {playlists && playlists.map((playlist, index) => (
            <SinglePlaylist key={index} isSelected={JSON.stringify(selectedPlaylists).includes(playlist.id)} handleSelect={selectHandler}>
              {playlist}
            </SinglePlaylist>
          ))}
          </Box>
          <Box 
            h="40vh"
            overflowY="scroll"
            sx={{
              '&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '8px',
              backgroundColor: `rgba(125, 125, 125, 0.1)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
              borderRadius: '8px',
            },
          }}
            display="flex"
            flexDirection="column"
            px={{ base: 4, lg: 10}}
            mb={{ base: 5, lg: 10}}
          >
          {selectedPlaylists && selectedPlaylists.map((playlist, index) => (
            <SinglePlaylist key={index} isSelected={JSON.stringify(selectedPlaylists).includes(playlist.id)} handleSelect={selectHandler} >
              {playlist}
            </SinglePlaylist>         
          ))}
          </Box>
          <ButtonGroup
            display="flex"
            justifyContent="space-around"
            >
          <Mashup lists={selectedPlaylists} user={user} />
          <Button 
          colorScheme='gray'
          rounded="full"
          w="33%"
          onClick={clear}  
          >
          Clear
          </Button>
          </ButtonGroup>
        </Box>
      </Layout>
    </>
  )
}