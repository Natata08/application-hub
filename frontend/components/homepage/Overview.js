import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const OverviewImageCard = () => {
  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: '100%', md: '400px', lg: '550px' },
        maxHeight: '500px',
        minHeight: { xs: '100%', sm: '350px', md: '400px', lg: '450px' },
        margin: '20px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem' },
          }}
        >
          Overview
        </Typography>
        <div
          sx={{
            height: '200px',
            backgroundColor: 'background.default',
            borderRadius: '8px',
            marginTop: '10px',
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ padding: '80px 0' }}
          >
            Placeholder: we will place a picture of how does this app work,
            example just an image to show how
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default OverviewImageCard
