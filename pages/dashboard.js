import React from "react";
import {
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input
} from "@chakra-ui/react";
import Header from '/components/Header.jsx';
import Layout from '/components/Layout.jsx';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [user , setUser] = useState('')

    useEffect(()=>{
     const user = Cookies.get('user')
     setUser(user)
    },[])

  return (
    <>
      <Header auth={true}/>
      <Layout>
        <chakra.form
          method="POST"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{
            sm: "hidden",
          }}
        >
          <Stack
            px={16}
            py={20}
            h={{ base: "85vh", lg: "720px"}}
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            spacing={6}
          >
            <FormControl>
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
                  placeholder={user}
                  focusBorderColor="gray.400"
                  rounded="md"
                  w="100%"
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </chakra.form>
      </Layout>
    </>
  )
}