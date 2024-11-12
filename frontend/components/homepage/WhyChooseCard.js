import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { useThemeContext } from '@/components/styles/ThemeApp'

export default function WhyChooseCard() {
  const { isLightMode, darkTheme, lightTheme } = useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Card
      style={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        maxHeight: '500px',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Why Choose Application Hub?
        </Typography>
        <Typography variant="body1" color={theme.palette.text.primary}>
          Job hunting is about more than sending out resumes—it is about finding
          the right opportunity and showcasing your strengths at each stage of
          the process. With Application Hub, you will have the structure and
          support to navigate your search professionally. Gain control over your
          job applications, keep track of your progress, and make informed
          decisions along the way.
        </Typography>
        <Typography variant="body1" color={theme.palette.text.primary}>
          Ready to make your job search more organized and less stressful? Try
          Application Hub today and take a step toward achieving your career
          goals with confidence!
        </Typography>
      </CardContent>
    </Card>
  )
}
