import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const OverviewImageCard = () => {
  return (
    <Card
      style={{
        maxWidth: '500px',
        maxHeight: '500px',
        minHeight: '360px',
        margin: '20px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h4" component="p" color="background.primary">
          Overview
        </Typography>
        <div
          style={{
            height: '200px',
            backgroundColor: 'background.default',
            borderRadius: '8px',
            marginTop: '10px',
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            style={{ padding: '80px 0' }}
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
