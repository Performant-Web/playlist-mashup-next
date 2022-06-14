import {
    Box,
    Image
  } from "@chakra-ui/react";

const SinglePlaylist = ({ children }) => {
    console.log(children.images.length)
    return (
        <Box
            p="1px"
            mt="2"
            display="flex"
            alignItems="center"
        >
            {(children.images.length > 0) && <Image src={children.images[children.images.length - 1].url} h="40px" w="40px" />}

            <Box
            p="2">
                {children.name}
            </Box>
            
            <Box
            p="2"
            color="gray.500">
                {children.tracks.total} Tracks
            </Box>
        </Box>
    )
  }

  export default SinglePlaylist;