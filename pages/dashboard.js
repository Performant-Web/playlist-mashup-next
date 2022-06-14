import React from "react";
import {
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Box
} from "@chakra-ui/react";
import Header from '/components/Header.jsx';
import Layout from '/components/Layout.jsx';
import SinglePlaylist from '/components/SinglePlaylist.jsx';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [user , setUser] = useState(Cookies.get('user'));
    const [playlists , setPlaylists] = useState()

    useEffect(()=>{
      setUser(Cookies.get('user'))
    },[])

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
                    User
                  </FormLabel>
                  <InputGroup size="sm">
                    <Input
                      name="user"
                      id="user"
                      placeholder={user}
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
            overflowY="scroll"
            display="flex"
            flexDirection="column"
            px={{ base: 4, lg: 10}}
          >
          {playlists && playlists.map((playlist, index) => (
            <SinglePlaylist>
              {playlist}
            </SinglePlaylist>         
          ))}
          </Box>
        </Box>
      </Layout>
    </>
  )
}