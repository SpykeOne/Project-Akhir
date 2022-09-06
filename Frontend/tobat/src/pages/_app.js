import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { rootReducer } from "../redux/store"
import AuthProvider from '../component/auth/AuthProvider'
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

const store = configureStore({reducer: rootReducer})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
