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
      <Script id='gtag' strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','G-LM906722HL');`}}>
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
