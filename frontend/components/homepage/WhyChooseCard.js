import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

export default function WhyChooseCard() {
  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: '100%', md: '400px', lg: '550px' },
        minHeight: { xs: '100%', sm: '350px', md: '400px', lg: '450px' },
        margin: '20px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
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
          Why Choose Application Hub?
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            padding: '10px',
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: {
              xs: '0.75rem',
              sm: '0.75rem',
              md: '0.85rem',
              lg: '1.05rem',
            },
          }}
        >
          Job hunting is about more than sending out resumes, It is about
          finding the right opportunity and showcasing your strengths at each
          stage of the process. With Application Hub, you will have the
          structure and support to navigate your search professionally. Gain
          control over your job applications, keep track of your progress, and
          make informed decisions along the way.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            padding: '10px',
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: {
              xs: '0.75rem',
              sm: '0.75rem',
              md: '0.85rem',
              lg: '1.05rem',
            },
          }}
        >
          Ready to make your job search more organized and less stressful? Try
          Application Hub today and take a step toward achieving your career
          goals with confidence!
        </Typography>
      </CardContent>
    </Card>
  )
}
