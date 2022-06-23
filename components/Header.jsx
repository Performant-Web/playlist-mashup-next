import React from "react";
import {
  chakra,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import GetStarted from '/components/GetStarted.jsx'
import SignOut from '/components/SignOut.jsx'
import { useViewportScroll } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

const ChakraUIHeader = ({ auth }) => {

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("white", "white");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bg = useColorModeValue("black", "rgb(24,24,24)");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center">
              <Link href="/" rounded="md" >
                <HStack p="8px">
                <img src="https://playlistmashup.com/logo.png" alt="playlist mashup logo" width="32" height="32" />
                </HStack>
              </Link>
            </Flex>

            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
              <IconButton
                size="lg"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="gray.300"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              {auth ? <SignOut text={bg} bg={text} /> : <GetStarted text={bg} bg={text} />}
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  );
};

export default ChakraUIHeader;