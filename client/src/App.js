import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ClientContextProvider from './context/ClientContext';
import BusinessContextProvider from './context/BusinessContext';
import FamilyPanelContextProvider from './context/FamilyPanelContext'
import LayoutPage from './components/Pages/LayoutPage';

const font = `'Nunito Sans', sans-serif`;

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          fontFamily: `'Nunito Sans', sans-serif`,
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#797979',
      main: '#585858',
      dark: '#3d3d3d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#eabc33',
      main: '#E5AC01',
      dark: '#a07800',
      contrastText: '#3d3d3d',
    },
    content:{
      main:"#F0F1F0"
    }
  },
  typography: {
    fontFamily: font,
  },
});

const App = () => {
  return (
    <ClientContextProvider>
        <BusinessContextProvider>
            <FamilyPanelContextProvider>
              <ThemeProvider theme={theme}>
                  <Router>
                      <CssBaseline />
                      <LayoutPage />
                  </Router>
              </ThemeProvider>
            </FamilyPanelContextProvider>
        </BusinessContextProvider>
    </ClientContextProvider>
  );
};

export default App;
