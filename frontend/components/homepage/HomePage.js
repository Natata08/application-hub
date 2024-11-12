import React from 'react'
import WhyChooseCard from './WhyChoosecard'
import TestimonialComponent from './Testimonial'
import OverviewImageCard from './Overview'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Introduction from './Introduction'
import CardLeftCurve from '../ui/CardLeftCurve'
import CardRightCurve from '../ui/CardRightCurve'
import { useThemeContext } from '@/components/styles/ThemeApp'

export default function HomePage() {
  const { isLightMode, darkTheme, lightTheme } = useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Box>
      <Introduction />

      <CardLeftCurve
        width="100vw"
        backgroundColor={theme.palette.background.footer}
        padding="40px 0"
        margin="20px 0"
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <Grid xs={12} sm={6} md={4}>
            <WhyChooseCard />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <OverviewImageCard />
          </Grid>
        </Grid>
      </CardLeftCurve>

      <CardRightCurve>
        <TestimonialComponent />
      </CardRightCurve>
    </Box>
  )
}
