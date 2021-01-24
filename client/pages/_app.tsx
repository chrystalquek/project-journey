import React from 'react';
import type { AppProps } from 'next/app';
import '@styles/app.css';
import { Provider } from 'react-redux';
import configureStore from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import NavBar from '@components/common/NavBar';
import Footer from '@components/common/Footer';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={configureStore.store}>
      <PersistGate loading={null} persistor={configureStore.persistor}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
