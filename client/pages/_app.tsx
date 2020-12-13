import React from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@styles/vars.css';
import '@styles/globals.css';
import { Provider } from 'react-redux';
import store from '@redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
