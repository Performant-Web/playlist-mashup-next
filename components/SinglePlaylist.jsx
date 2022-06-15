import {
    Box,
    Image,
    Link,
    useColorModeValue,
    Checkbox,
  } from "@chakra-ui/react";

const SinglePlaylist = ({ children, handleSelect, isSelected }) => {

    const hover = useColorModeValue("gray.200", "gray.700");

    function truncate(playlist) {
        if (playlist.length > 25) {
            return playlist.slice(0, 25) + "..."
        } else {
            return playlist
        }
    }

    return (
        <Link
            p="2"
            ml="4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={(hover === "gray.700") ? {
                bg: "gray.700",
            }:{ bg: "gray.200",
            }}
            bg={isSelected && ((hover === "gray.700") ? "gray.700": "gray.200" )}
            onClick={() => handleSelect(children)}
            >
            {(children.images.length > 0) ? 
            <Image src={children.images[children.images.length - 1].url} h="50px" w="50px" />:
            <Box bg="gray.500" h="50px" w="50px" />}
            <Box
                display="flex"
                flexDirection="column"
                px="2"
            >
                <Box>
                    {truncate(children.name)}
                </Box>
                <Box
                color="gray.500">
                    {children.tracks.total} Tracks
                </Box>
            </Box>
            <Checkbox
            isChecked={isSelected}
            colorScheme="gray" 
            ml="auto"
            mr="4"
            rounded="md"
            size="lg"
            pointerEvents="none"
            />
        </Link>
    )
  }

  export default SinglePlaylist;


  