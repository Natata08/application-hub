import React from 'react'
import { Card, CardContent } from '@mui/material'
import Carousel from './Carousel'
import { useIsMobile } from '@/app/hooks/useIsMobile'

const OverviewImageCard = () => {
  const isMobile = useIsMobile()
  return (
    <>
      {!isMobile && (
        <Card
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '400px', lg: '550px' },
            maxHeight: '500px',
            minHeight: { xs: '100%', sm: '350px', md: '400px', lg: '450px' },
            minWidth: '450px',
            margin: '20px',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Carousel />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default OverviewImageCard
