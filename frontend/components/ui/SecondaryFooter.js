'use client'

import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'

export default function SecondaryFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.footer',
        color: 'text.footer',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          padding: '0 10px',
          margin: '0 auto',

          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography
          variant="body2"
          color="text.footer"
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.9rem' },
            mb: { xs: 0, sm: 0 },
          }}
        >
          &copy; {new Date().getFullYear()} Developed by FONA
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            <LinkedInIcon
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            />
          </IconButton>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            <FacebookIcon
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            color="inherit"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            <TwitterIcon
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
