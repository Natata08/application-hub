'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const ThemeContext = createContext()

const colors = {
  primary: '#126C62', // Rich green as the primary color
  secondary: '#E07A5F', // Bright orange for accents
  accent: '#FF8F5C', // Slightly warmer accent shade
  neutralLight: '#FFFFFF', // White for light background
  neutralDark: '#1F3A3A', // Softened dark green for dark background
  textPrimaryLight: '#126C62', // Primary text in light theme
  textSecondaryLight: '#6B6B6B', // Secondary text in light theme
  textPrimaryDark: '#FFFFFF', // Primary text in dark theme
  textSecondaryDark: '#FFB384', // Accent text in dark theme
  paperLight: '#F9F9F9', // Light gray for paper in light theme
  paperDark: '#213D3D', // Softer green for paper in dark theme
  footerLight: '#000000', // Black for light footer
  footerDark: '#F9FAD2', // Light yellow for dark footer
  cardBlue: '#d2e8d4', //Light blue color
  dashboard: '#C5D5D4', // Dashboard background
  cardBlueDark: '#A7D08B',
  cardYellow: '#F9FAD2',
}

const sharedColors = {
  primary: { main: '#134B48' },
  secondary: { main: '#BB8266' },
  accent: { main: '#F4A261' },
  paperCommon: { main: '#F7F7F7' },
  dashboard: { main: '#C5D5D4' },
}

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
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...sharedColors,
    text: {
      primary: colors.textPrimaryLight,
      secondary: colors.textSecondaryLight,
      footer: colors.textPrimaryLight,
    },
    background: {
      default: colors.neutralLight,
      paper: colors.paperLight,
      footer: colors.footerDark,
      cardYellow: colors.cardYellow,
      cardBlue: colors.cardBlue,
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
            color: colors.neutralLight,
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
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...sharedColors,
    text: {
      primary: colors.textPrimaryDark,
      secondary: colors.textSecondaryDark,
      footer: colors.textSecondaryDark,
    },
    background: {
      default: colors.neutralDark,
      paper: colors.paperDark,
      footer: colors.paperDark,
      cardBlue: colors.cardBlueDark,
      cardYellow: colors.cardBlueDark,
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
})

export const useThemeContext = () => useContext(ThemeContext)

export default function ThemeApp({ children }) {
  const [isLightMode, setIsLightMode] = useState(true)
  const handleThemeChange = () => {
    const newTheme = !isLightMode
    setIsLightMode(newTheme)
    localStorage.setItem('modeTheme', JSON.stringify(newTheme))
  }
  const currentTheme = isLightMode ? lightTheme : darkTheme
  useEffect(() => {
    const savedTheme = localStorage.getItem('modeTheme')
    if (savedTheme !== null) {
      setIsLightMode(JSON.parse(savedTheme))
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{ isLightMode, lightTheme, darkTheme, handleThemeChange }}
    >
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
