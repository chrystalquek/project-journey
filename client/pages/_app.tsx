import React from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@styles/vars.css';
import '@styles/globals.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#595858',
    },
  },
  palette: {
    primary: {
      main: '#d0de39', // yellow green
    },
    secondary: {
      light: '#e5f8fb', // light blue for background
      main: '#00bbdc', // blue
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
