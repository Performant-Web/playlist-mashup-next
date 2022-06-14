import React from "react";
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const Layout = ({ children }) => {
    const bg = useColorModeValue("rgba(255,255,255,.8)", "rgba(0,0,0,.93)");
  return (
      <Box 
        bgImage="/spikes.webp" 
        sx={{ height: 'calc(100vh - 72px)' }}
        overflowY="hidden" 
        >
        <Box bgColor={bg}  display="flex" alignItems="center" h="100%">
            <Box mx={{ base: 0, lg: "auto" }}>
                <Box
                    w={{ base: "100vw", lg: "720px" }}
                    border="solid 1px transparent"
                >
                    <Box
                        px="0"
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