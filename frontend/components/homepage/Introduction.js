import React from 'react'
import { Grid, Typography, Button, Container } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'

export default function Introduction() {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const isMobile = useIsMobileSmall()

  return (
    <Grid
      container
      sx={{
        height: {
          xs: 'auto',
          sm: 'auto',
          md: '100vh',
          lg: '100vh',
          xl: '100vh',
        },
        backgroundColor: 'background.default',
      }}
    >
      {/* Text Section */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'space-around', md: 'flex-start' },
          alignItems: 'center',
          px: 3,
          mt: {
            xs: '2rem',
            sm: '4rem',
            md: '8rem',
            lg: '13rem',
            xl: '20rem',
          },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: {
                xs: '2rem',
                sm: '1.6rem',
                md: '1.75rem',
                lg: '2rem',
                xl: '3rem',
              },
              textAlign: 'center',
            }}
          >
            Application Hub
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.primary',
              mb: 4,
              fontSize: {
                xs: '1rem',
                sm: '0.75rem',
                md: '0.75rem',
                lg: '1rem',
                xl: '1.5rem',
              },
              textAlign: 'center',
            }}
          >
            Make your job search much easier!
            <Typography
              variant="body1"
              sx={{
                color: '#FFB384',
                mb: 0,
                fontSize: {
                  xs: '1rem',
                  sm: '0.75rem',
                  md: '0.75rem',
                  lg: '1rem',
                  xl: '1.5rem',
                },
                textAlign: 'center',
              }}
            >
              Manage, organize, and track your applications.
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/register"
            sx={{
              px: { xs: 3, sm: 2 },
              py: { xs: 1, sm: 1 },
              fontSize: { xs: '0.875rem', sm: '0.6rem', md: '0.85rem' },
              alignSelf: 'center',
            }}
          >
            Sign Up
          </Button>
        </Container>
      </Grid>

      {/* Image Section */}
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          p: { xs: 10, sm: 0, md: 0, lg: 0, xl: 0 },
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          mt: {
            xs: 0,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
          },
        }}
      >
        <Image
          src={
            isMobile
              ? isDarkMode
                ? '/mobileDark.png'
                : '/mobileLight.png'
              : isDarkMode
                ? '/desktopDark.png'
                : '/desktopLight.png'
          }
          priority={true}
          alt="Example Image"
          width={isMobile ? 420 : 1000}
          height={isMobile ? 600 : 500}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Grid>
    </Grid>
  )
}
