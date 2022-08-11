import React from "react";
import Header from '/components/Header.jsx'
import Layout from '/components/Layout.jsx'
import {
  chakra,
  Box,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import GetStarted from '/components/GetStarted.jsx'
import Head from 'next/head';

const Home = ({ clientId }) => {
    const bg = useColorModeValue("rgba(255,255,255,.8)", "rgba(0,0,0,.93)");
    const text = useColorModeValue("black", "white");
  return (
      <>
      <Head>
        <title>Playlist Mashup</title>
      </Head>
        <Header auth={false} />
        <Layout>
            <Box
                textAlign="center"
                mx="auto"
            >
                <chakra.h1
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color={text}
                >
                <chakra.span display={{ base: "block", xl: "inline" }}>
                    Playlist Mashup
                </chakra.span>
                </chakra.h1>
                <chakra.p
                mt={{ base: 3, sm: 5, md: 5 }}
                mx="auto"
                mb={6}
                width="400px"
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.500"
                lineHeight="base"
                >
                Combine any public Spotify playlists into a new list with equal parts from the originals
                </chakra.p>
                <Stack
                direction="row"
                mb={{ base: 4, md: 8 }}
                spacing={{ base: 4, md: 2 }}
                mx="auto"
                justifyContent="center"
                >
                <GetStarted clientId={clientId} text={bg} bg={text}/>
                </Stack>
            </Box>
        </Layout>
      </>
  );
};

export default Home;