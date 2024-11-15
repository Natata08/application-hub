import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'

export default function Introduction() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        backgroundColor: 'background.default',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          }}
        >
          Application Hub
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          Your all-in-one platform to organize and manage your job search. Track
          applications, set reminders, and stay on top of your career goals.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/register"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Sign Up
        </Button>
      </Container>
    </Box>
  )
}
