// const colors = {
//   green: '#134B48',
//   darkGreen: '#264240',
//   lightGreen: '#D2E8D4',
//   yellow: '#F4F5A7',
//   lightYellow: '#F9FAD2',
//   orange: '#BB8266',
//   white: '#FFFFFF',
//   black: '#000000',
// };



"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

const colors = {
  primary: '#134B48', // Green as primary color
  secondary: '#BB8266', // Orange as secondary accent color
  accent: '#F4A261', // A warmer orange shade
  neutralLight: '#FFFFFF', // White as light background
  neutralDark: '#264240', // Dark green as dark background
  textPrimaryLight: '#134B48', // Green text for light mode
  textSecondaryLight: '#757575', // Lighter text for light mode
  textPrimaryDark: '#FFFFFF', // White text for dark mode
  textSecondaryDark: '#F4A261', // A warmer orange shade text for dark mode
  error: '#D32F2F', // Red for error
  paperLight: '#F7F7F7', // Light grayish beige for paper in light theme
  paperDark: '#1A3D3D', // Light greenish shade for paper in dark theme
  footerLight: '#000000', // Black
  footerDark: '#F9FAD2', //Light Yellow    
};

const commonStyles = {
  MuiButton: {
    styleOverrides: {
      root: {
        color: colors.neutralLight,
        '&:hover': {
          backgroundColor: colors.secondary,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        margin: '12px 0',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.accent,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.accent,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          color: colors.accent,
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    text: {
      primary: colors.textPrimaryLight,
      secondary: colors.textSecondaryLight,
    },
    background: {
      default: colors.neutralLight,
      paper: colors.paperLight,
      footer: colors.footerLight,
    },
  },
  components: {
    ...commonStyles,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        text: {
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.accent,
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.textPrimaryLight,
          '&:hover': {
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          },
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.neutralLight,
          '&:hover': {
            backgroundColor: colors.accent,
            color: colors.primary,
          },
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    text: {
      primary: colors.textPrimaryDark,
      secondary: colors.textSecondaryDark,
    },
    background: {
      default: colors.neutralDark,
      paper: colors.paperDark,
    },
  },
  components: {
    ...commonStyles,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        text: {
          color: colors.accent,
          '&:hover': {
            backgroundColor: colors.primary,
          },
        },
        outlined: {
          borderColor: colors.accent,
          color: colors.accent,
          '&:hover': {
            backgroundColor: colors.primary,
            borderColor: colors.accent,
          },
        },
        contained: {
          backgroundColor: colors.accent,
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.primary,
            color: colors.neutralLight,
          },
        },
      },
    },
  },
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeApp({ children }) {
  const [isLightMode, setIsLightMode] = useState(true);

  const handleThemeChange = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('modeTheme', JSON.stringify(newTheme));
  };

  const currentTheme = isLightMode ? lightTheme : darkTheme;

  useEffect(() => {
    const savedTheme = localStorage.getItem('modeTheme');
    if (savedTheme !== null) {
      setIsLightMode(JSON.parse(savedTheme));
    } else {
      setIsLightMode(true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isLightMode, darkTheme, lightTheme, handleThemeChange }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}