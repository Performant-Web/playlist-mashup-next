import React from "react";
import {
  Box,
  Icon,
} from "@chakra-ui/react";
import { FaMusic } from "react-icons/fa";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const SignOut = ({text, bg}) => {
const router = useRouter()

  function LogOut () {
    Cookies.remove('user')
    Cookies.remove('token')
    Cookies.remove('state')
    router.push('/')
}
    return (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        as="button"
        onClick={()=>{LogOut()}}
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
          SIGN OUT
        </Box>
      </Box>
    )
}

    export default SignOut;