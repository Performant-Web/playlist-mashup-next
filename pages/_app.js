import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ContextProvider } from '/utils/Context.jsx'
import '../styles/globals.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/700.css'

//focus outline - accessibility
const focusShadow = '0 0 0 2px #1dd760'

const theme = extendTheme({
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  shadows: {
    outline: focusShadow
  },
  components: {
    Button: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    },
    Box: {
      baseStyle: {
        _focus: {
          boxShadow: focusShadow
        }
    }

    },
    Link: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    }
  },
})

function App({ Component, pageProps }) {
  return (
  <ChakraProvider theme={theme}>
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  </ChakraProvider>
  )
}

export default App
