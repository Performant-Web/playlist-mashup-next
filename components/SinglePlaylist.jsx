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
            p="1"
            ml="2"
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
            <Image src={children.images[children.images.length - 1].url} h="40px" w="40px" alt=""/>:
            <Box bg="gray.500" h="40px" w="40px" />}
            <Box
                as="span"
                fontSize="sm"
                display="flex"
                flexDirection="column"
                px="2"
            >
                <Box>
                    {truncate(children.name)}
                </Box>
                <Box
                as="span" fontSize="sm" color="gray.500">
                    {children.tracks.total} Tracks
                </Box>
            </Box>
            <Checkbox
            isChecked={isSelected}
            colorScheme="gray" 
            ml="auto"
            mr="2"
            rounded="md"
            size="md"
            pointerEvents="none"
            />
        </Link>
    )
  }

  export default SinglePlaylist;


  