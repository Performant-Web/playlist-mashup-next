import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ContextProvider } from '/utils/Context.jsx'
import '../styles/globals.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/700.css'
import Script from 'next/script'

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
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-LM906722HL`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LM906722HL', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  </>
  )
}

export default App
