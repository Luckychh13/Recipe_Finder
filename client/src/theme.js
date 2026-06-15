import { createTheme } from '@mui/material/styles';

const theme=createTheme({
    palette:{
        primary:{
            main:'#f0a500',
        },
        secondary:{
            main:'#424242',
        },
        background:{
            default:'#f7f7f7',
            paper:'#ffffff'
        },
    },
    typography:{
        fontFamily:'"Montserrat","Roboto","Helvetica","Arial",sans-serif',
        h1:{
            fontWeight:700,
        },
        h2:{
            fontWeight:700,
        },
        h3:{
            fontWeight:700,
        },
    },
    components: {
    MuiButton: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          padding: '10px 20px',
        }
      }
    },
     MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
             transform: 'translateY(-4px)',
             boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
          }
        }
      }
    }
  },
});
export default theme;