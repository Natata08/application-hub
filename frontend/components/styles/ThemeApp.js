"use client";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    body1: {
      fontSize: '1rem',
    },
  },
  palette: {
    background: {
      default: '#FFFFFF', // White
      paperGreen: '#264240', // Dark Green
      paperYellow:'#F9FAD2', // Light Yellow
      cardYellow: '#F4F5A7',  // Yellow
      cardGreen: '#134B48',  // Green
      cardOrange: '#BB8266',  // Orange
      cardLightGreen: '#D2E8D4',  // Light Green
      footer: '#000000', // Black
      buttonPrimary:'#000000', // Black
      buttonSecondary: '#F4F5A7',  // Yellow
    },
    text: {
      primary: '#134B48', // Green
      secondary: '#FFFFFF', // White
      contrast: '#BB8266',  // Orange
    },

  },
});

export default function ThemeApp({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}