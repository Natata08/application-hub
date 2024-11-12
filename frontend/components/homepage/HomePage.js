import React from 'react'
import WhyChooseCard from './WhyChoosecard'
import TestimonialComponent from './Testimonial'
import OverviewImageCard from './Overview'
import { Box } from '@mui/material'
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
        <Box>
          <WhyChooseCard />
          <OverviewImageCard />
        </Box>
      </CardLeftCurve>

      <CardRightCurve>
        <TestimonialComponent />
      </CardRightCurve>
    </Box>
  )
}
