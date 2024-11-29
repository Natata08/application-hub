'use client'

import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import Logo from './Logo'
import Grid from '@mui/material/Grid2'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.footer',
        color: 'text.footer',
        boxShadow: '0px -1px 6px rgba(0, 0, 0, 0.4)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '5px auto',
          padding: '10px',
          justifyContent: { xs: 'center', sm: 'space-between' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        {/* For small screen logo and other link will display in grid */}
        <Grid
          container
          spacing={2}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: { xs: 'space-between', sm: 'none' },
          }}
        >
          <Grid xs={12}>
            <Box paddingX="10px" marginTop="20px">
              <Logo />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box paddingX="10px">
              <Link
                href="/"
                color="inherit"
                sx={{
                  display: 'block',
                  fontSize: { xs: '0.7rem', sm: '1rem' },
                }}
                underline="none"
              >
                Home
              </Link>
              <Link
                href="/about"
                color="inherit"
                sx={{
                  display: 'block',
                  fontSize: { xs: '0.7rem', sm: '1rem' },
                }}
                underline="none"
              >
                About
              </Link>
            </Box>

            <Box paddingX="10px">
              <Typography
                variant="h6"
                sx={{
                  color: 'text.footer',
                  fontSize: { xs: '0.7rem', sm: '1rem' },
                }}
              >
                Contact us
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.7rem', sm: '1rem' },
                }}
              >
                <Link
                  href="mailto:support@applicationhub.com"
                  color="inherit"
                  underline="none"
                >
                  support@applicationhub.com
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* For default layout */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: { xs: 'none', sm: 'space-between' },
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '15px',
          }}
        >
          <Box paddingX="10px">
            <Logo />
          </Box>

          <Box paddingX="10px">
            <Link
              href="/"
              color="inherit"
              sx={{
                display: 'block',
                fontSize: { xs: '0.7rem', sm: '1rem' },
              }}
              underline="none"
            >
              Home
            </Link>
            <Link
              href="/about"
              color="inherit"
              sx={{
                display: 'block',
                fontSize: { xs: '0.7rem', sm: '1rem' },
              }}
              underline="none"
            >
              About
            </Link>
          </Box>

          <Box paddingX="10px">
            <Typography
              variant="h6"
              sx={{
                color: 'text.footer',
                fontSize: { xs: '0.7rem', sm: '1rem' },
              }}
            >
              Contact us
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.7rem', sm: '1rem' },
              }}
            >
              <Link
                href="mailto:support@applicationhub.com"
                color="inherit"
                underline="none"
              >
                support@applicationhub.com
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
