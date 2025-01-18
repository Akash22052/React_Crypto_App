import { useState } from 'react'
import { BrowserRouter ,Route, Routes} from 'react-router-dom'
 //import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
 import './App.css'
 import Header from './Components/header'
 import { HomePage } from './pages/homepage'
 import CoinPage from './pages/coinpage'
 import { styled } from '@mui/material/styles';
import CryptoProvider from './Components/Context/cryptoProvide'
import { Container } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});



 const AppContainer = styled("div")({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh',
});
function App() {

  return (
    <CryptoProvider>
   <BrowserRouter>
   <ThemeProvider theme={theme}>
   <AppContainer>
   <Header />
   <Routes>
   <Route path='/' Component={HomePage} />
   <Route path='/coins/:id' Component={CoinPage} />
   </Routes>
   </AppContainer>
   </ThemeProvider>
   </BrowserRouter>
   </CryptoProvider>
  )
}

export default App
