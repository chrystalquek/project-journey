import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans",
    fontWeightMedium: 600, // semibold
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
  },
  palette: {
    primary: {
      main: "#d0de39", // yellow green
      dark: "#8d9a00", // dark green
    },
    secondary: {
      light: "#e5f8fb", // light blue for background
      main: "#00badc", // blue
    },
    tertiary: {
      main: "#d98f00", // orange
    },
    reject: {
      main: "#d32a20", // red for reject button
    },
    action: {
      active: "#eaeaea", // light grey for close button
      disabled: "#1f1f1f", // darker grey for disabled button
    },
    text: {
      primary: "#000000", // black
      secondary: "#8d9a00", // dark green // same as palette.primary.dark
    },
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32, 48, 64], // padding & margins
});

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    tertiary: Palette["primary"];
    reject: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
    reject: PaletteOptions["primary"];
  }
}
/* eslint-enable no-unused-vars */

export default theme;
