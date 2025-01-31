import { createTheme } from '@mui/material/styles';  

// Define your custom theme  
const theme = createTheme({  
  palette: {  
    primary: {  
      main: '#1976d2', // Blue  
    },  
    secondary: {  
      main: '#dc004e', // Pink  
    },  
    background: {  
      default: '#f5f5f5', // Light gray  
    },  
  },  
  typography: {  
    fontFamily: 'Roboto, Arial, sans-serif',  
    h1: {  
      fontSize: '2.5rem',  
      fontWeight: 700,  
    },  
    body1: {  
      fontSize: '1rem',  
    },  
  },  
});  

export default theme;