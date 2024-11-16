'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
} from '@mui/material'
import Logo from './Logo'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { useThemeContext } from '@/components/styles/ThemeApp'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useAuth } from '../Context/authentication'

export default function NavBar() {
  const { isLightMode, handleThemeChange } = useThemeContext()
  const { isLoggedIn, userInfo, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        color: 'text.primary',
        width: '100%',
        padding: '0',
        margin: '0',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Logo />
        </Typography>

        <IconButton
          color="inherit"
          sx={{ display: { xs: 'block', sm: 'none' } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: 1,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isLoggedIn ? (
            <Link href="/user" passHref>
              <Button
                color="inherit"
                sx={{ margin: '0', color: 'text.primary' }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/" passHref>
              <Button
                color="inherit"
                sx={{ margin: '0', color: 'text.primary' }}
              >
                Home
              </Button>
            </Link>
          )}

          <Link href="/about" passHref>
            <Button color="inherit" sx={{ margin: '0', color: 'text.primary' }}>
              About
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              {userInfo && (
                <span
                  color="inherit"
                  sx={{ margin: '5px', color: 'text.primary' }}
                >
                  WELCOME, {userInfo.first_name}!
                </span>
              )}
              <IconButton
                onClick={handleThemeChange}
                color="inherit"
                size="large"
              >
                {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <Link href={`/login`}>
                <Button onClick={logout} variant="contained">
                  LogOut
                </Button>
              </Link>
            </>
          ) : (
            <>
              <IconButton
                onClick={handleThemeChange}
                color="inherit"
                size="large"
              >
                {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              <Link href={`/login`}>
                <Button variant="contained">LogIn</Button>
              </Link>
              <Link href={`/register`}>
                <Button variant="contained">Sign up</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={handleCloseDrawer}
        >
          {isLoggedIn ? (
            <Link href="/user" passHref>
              <Button
                color="inherit"
                sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/" passHref>
              <Button
                color="inherit"
                sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
              >
                Home
              </Button>
            </Link>
          )}

          <Link href="/about" passHref>
            <Button
              color="inherit"
              sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
            >
              About
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              {userInfo && (
                <span
                  color="text.primary"
                  sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
                >
                  WELCOME, {userInfo.first_name}!
                </span>
              )}
              <IconButton
                onClick={handleThemeChange}
                color="inherit"
                size="large"
                sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
              >
                {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <Link href={`/login`}>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
                >
                  LogOut
                </Button>
              </Link>
            </>
          ) : (
            <>
              <IconButton
                onClick={handleThemeChange}
                color="inherit"
                size="large"
                sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
              >
                {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              <Link href={`/login`}>
                <Button
                  variant="contained"
                  sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
                >
                  LogIn
                </Button>
              </Link>

              <Link href={`/register`}>
                <Button
                  variant="contained"
                  sx={{ margin: '5px', width: '80%', textAlign: 'left' }}
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}
