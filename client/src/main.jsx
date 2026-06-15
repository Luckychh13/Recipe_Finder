import React from 'react';  
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css';
import{BrowserRouter} from'react-router-dom';
import {AuthProvider} from'./context/AuthContext.jsx';

import {ThemeProvider,createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';


const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
