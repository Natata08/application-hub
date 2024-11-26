import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { features } from '@/constants/features'
import { useIsMobile } from '@/app/hooks/useIsMobile'

const FeaturesLine = () => {
  const isMobile = useIsMobile()

  console.log(isMobile)
  return (
    <Box
      sx={{
        padding: '0 100px',
        backgroundColor: 'background.defaultSecond',
        marginBottom: { xs: '0.75rem', sm: '40px', md: '75px', lg: '200px' },
        padding: isMobile ? '100px 0 100px 0' : '50px 0 50px 0',
      }}
    >
      <Grid container spacing={3}>
        {features.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: isMobile ? '50px' : '0',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2, color: 'text.footer' }}>{item.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: '',
                    sm: '0.75rem',
                    md: '0.75rem',
                    lg: '1.25rem',
                  },
                  color: 'text.footer',
                  margin: '10px 0',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: '',
                    sm: '0.5rem',
                    md: '0.65rem',
                    lg: '1rem',
                  },
                  marginBottom: '30px',
                  maxWidth: '250px',
                  width: '100%',
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FeaturesLine
