import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontSize: '32px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 400,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
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
    text: {
      primary: '#000',
    },
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 64], // padding & margins
});

export default theme;
