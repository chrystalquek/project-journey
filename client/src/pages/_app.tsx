import React from "react";
import type { AppProps } from "next/app";
import "@styles/app.css";
import { Provider } from "react-redux";
import { store, persistor } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@styles/theme";
import NavBar from "@components/common/navbar-component/NavBar";
import Footer from "@components/common/Footer";
import { Container } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div
                style={{
                  display: "flex",
                  minHeight: "100vh",
                  flexDirection: "column",
                }}
              >
                <NavBar />
                <Container
                  style={{ display: "flex", justifyContent: "center", flex: 1 }}
                >
                  <Component {...pageProps} />
                </Container>
                <Footer />
              </div>
            </MuiPickersUtilsProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
