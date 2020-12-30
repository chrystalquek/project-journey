import React from 'react';
import type { AppProps } from 'next/app';
import '@styles/app.css'
import { Provider } from 'react-redux';
import store from '@redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
