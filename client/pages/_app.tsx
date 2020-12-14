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
      fontSize: "2rem",
      fontWeight: 700
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500
    }
  }
})

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
