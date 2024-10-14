import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#242424',
      light: '#242424',
      dark: '#242424',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [
            {
              fontFamily: 'Poppins',
              src: `
                local('Poppins-Regular'), 
                url('./assets/fonts/Poppins-Regular.ttf') format('truetype')
              `,
            },
          ],

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            opacity: 0.96,
            backgroundColor: '#242424',
          },
        },
      },
    },
  },
});
