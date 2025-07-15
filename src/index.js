import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './css/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
//import theme from './theme'; // Adicione esse import

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Elemento root não encontrado');
}

const root = createRoot(rootElement);

root.render(
  <Router>
    {/*<ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
      <App />
    {/*</ChakraProvider>*/}
  </Router>
);
