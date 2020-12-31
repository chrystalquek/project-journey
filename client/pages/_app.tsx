import React from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@styles/vars.css';
import '@styles/globals.css';
import { Provider } from 'react-redux';
import configureStore from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={configureStore.store}>
      <PersistGate loading={null} persistor={configureStore.persistor}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
