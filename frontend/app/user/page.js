'use client'
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Link,
  IconButton,
} from '@mui/material'
import { useThemeContext } from '@/components/styles/ThemeApp'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

export default function User() {
  const { isLightMode, handleThemeChange, darkTheme, lightTheme } =
    useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Box sx={{ minHeight: '100vh', padding: 4 }}>
      <Container>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ padding: 3, backgroundColor: theme.palette.background.footer }}
        >
          Welcome to Application Hub! ONLY EXAMPLE!!!!
        </Typography>

        <Paper
          elevation={3}
          sx={{ padding: 3, color: theme.palette.text.secondary }}
        >
          <Typography variant="h6">
            Discover the best job application manager.
          </Typography>
        </Paper>
        <Link href={`/register`}>
          <Button variant="contained" sx={{ marginTop: 3 }}>
            Sign up
          </Button>
        </Link>

        <Button
          onClick={handleThemeChange}
          variant="outlined"
          sx={{
            marginTop: 3,
          }}
        >
          Toggle Theme
        </Button>

        <Link href={`/register`}>
          <Button variant="contained" sx={{ marginTop: 3 }}>
            Sign up
          </Button>
        </Link>

        <IconButton onClick={handleThemeChange} color="inherit" size="large">
          {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Container>
    </Box>
  )
}
