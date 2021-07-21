import React from "react";
import type { AppProps } from "next/app";
import "@styles/app.css";
import { Provider } from "react-redux";
import configureStore from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@styles/theme";
import NavBar from "@components/common/navbar-component/NavBar";
import Footer from "@components/common/Footer";
import { Container } from "@material-ui/core";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={configureStore.store}>
      <PersistGate loading={null} persistor={configureStore.persistor}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
              }}
            >
              <NavBar />
              <Container style={{ flex: 1 }}>
                <Component {...pageProps} />
              </Container>
              <Footer />
            </div>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
