import React from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@styles/vars.css';
import '@styles/globals.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';

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
