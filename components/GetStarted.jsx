import React from 'react';
import { useAppContext } from '/utils/Context.jsx'
import {
  Box,
  Icon,
} from '@chakra-ui/react';
import { FaMusic } from 'react-icons/fa';
import { useRouter } from 'next/router';

const GetStarted = ({ text, bg }) => {
const router = useRouter();
const context = useAppContext();
const { clientId, stateKey, redirectUri, scope } = context;

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

  function Auth () {
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);
    router.push(url);
  }
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        as="button"
        onClick={()=>{Auth()}}
        //href={""}
        //target="_blank"
        //rel="noopener noreferrer"
        bgColor={bg}
        color={text}
        px="2em"
        minH="48px"
        w="200px"
        rounded="full"
        outline="0"
        transition="all 0.3s"
        _hover={{
          bgColor: "#1dd760",
          color: "black"
        }}
        _active={{
          borderColor: "gray.200",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        ml={5}
      >
        <Icon 
        as={FaMusic} 
        w="4" 
        h="4"   
        mr="2"    
        />
        <Box 
        as="strong"
        lineHeight="inherit"
        fontWeight="semibold"
        fontSize="14px"
        >
          GET STARTED
        </Box>
      </Box>
    )
  }

  export default GetStarted;