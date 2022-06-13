import React from "react";
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const Layout = ({ children }) => {
    const bg = useColorModeValue("rgba(255,255,255,.8)", "rgba(0,0,0,.93)");
    const text = useColorModeValue("black", "white");
  return (
      <Box bgImage="/spikes.webp">
        <Box bgColor={bg} pos="relative" overflow="hidden" sx={{ height: 'calc(100vh - 72px)' }} display="flex" alignItems="center">
            <Box maxW="7xl" mx="auto">
                <Box
                    pos="relative"
                    pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                    w={{ base: "100vw", md: "720px" }}
                    border="solid 1px transparent"
                >
                    <Box
                        px={{ base: 4, sm: 6, lg: 8 }}
                        mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
                    >
                    {children}  
                    </Box>      
                </Box>
            </Box>
        </Box>
      </Box>
    );
};

export default Layout;