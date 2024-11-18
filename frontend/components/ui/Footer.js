'use client'

import React from 'react'
import { Box, Typography, Link, IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import Logo from './Logo'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.footer',
        color: 'text.footer',
        py: { xs: 1, sm: 1 },
        boxShadow: '0px -1px 6px rgba(0, 0, 0, 0.4)',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Logo />
          <Typography
            variant="body2"
            color="text.footer"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
          >
            &copy; {new Date().getFullYear()} ApplicationHub
          </Typography>
          <Box
            sx={{
              mt: { xs: 1, sm: 2 },
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.footer',
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Learn
          </Typography>

          <Link
            color="inherit"
            sx={{
              display: 'block',
              mb: { xs: 0.4, sm: 0.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
            underline="none"
          >
            Schedule a demo
          </Link>
          <Link
            color="inherit"
            sx={{
              display: 'block',
              mb: { xs: 0.4, sm: 0.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
            underline="none"
          >
            Help Center
          </Link>
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.footer',
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Our company
          </Typography>
          <Link
            color="inherit"
            sx={{
              display: 'block',
              mb: { xs: 0.4, sm: 0.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
            underline="none"
          >
            Privacy Policy
          </Link>
          <Link
            color="inherit"
            sx={{
              display: 'block',
              mb: { xs: 0.4, sm: 0.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
            underline="none"
          >
            User Terms
          </Link>
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.footer',
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Contact us
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
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
  )
}
