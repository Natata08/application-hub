import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useThemeContext } from '@/components/styles/ThemeApp'

const OverviewImageCard = () => {
  const { isLightMode, darkTheme, lightTheme } = useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Card
      style={{
        maxWidth: '500px',
        maxHeight: '500px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="p"
          color={theme.palette.background.primary}
        >
          Overview
        </Typography>
        <div
          style={{
            height: '200px',
            backgroundColor: theme.palette.background.default,
            borderRadius: '8px',
            marginTop: '10px',
          }}
        >
          <Typography
            variant="body2"
            color={theme.palette.text.primary}
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
