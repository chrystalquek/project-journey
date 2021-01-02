import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '2.4rem',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#595858',
    },
    body2: {
      fontSize: '0.8rem',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#d0de39', // yellow green
    },
    secondary: {
      light: '#e5f8fb', // light blue for background
      main: '#00bbdc', // blue
      dark: '#0096ae',
    },
    text: {
      primary: '#000',
    },
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32, 48, 64], // padding & margins
});

export default theme;
