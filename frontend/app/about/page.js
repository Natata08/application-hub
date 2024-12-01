import { Box, Card, CardContent, Typography } from '@mui/material'
import AboutUs from './aboutUs'
import Vision from './OurVision'

export default function About() {
  return (
    <Box
      margin="20px"
      sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '2rem' } }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          mt: 10,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        Application Hub
      </Typography>
      <Typography
        textAlign="center"
        gutterBottom
        color="text.footer"
        sx={{ mt: 4, mb: 8 }}
      >
        Welcome to Application Hub, your ultimate companion in managing your job
        applications effortlessly and effectively.
      </Typography>

      <AboutUs />

      <Box
        sx={{
          color: 'text.secondary',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',

          mt: { xs: 1, sm: 3, md: 8 },
        }}
      >
        <Card
          style={{
            maxWidth: '1000px',
            margin: '30px auto',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h5"
              textAlign="left"
              color="text.footer"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                mt: 3,
                typography: { xs: 'h5', sm: 'h5', md: 'h4' },
              }}
            >
              What We Offer:
            </Typography>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>
                <Typography sx={{ mb: 2 }}>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.footer',
                      marginRight: '4px',
                    }}
                  >
                    Track Your Applications:
                  </Box>
                  <Box component="span" sx={{ color: 'text.primary' }}>
                    Keep a detailed record of every job you apply for, from
                    application date to current status.
                  </Box>
                </Typography>
              </li>
              <li>
                <Typography sx={{ mb: 2 }}>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.footer',
                      marginRight: '4px',
                    }}
                  >
                    Maintain Company Details:
                  </Box>
                  <Box component="span">
                    Store important information about the companies you are
                    applying to, all in one place.
                  </Box>
                </Typography>
              </li>
              <li>
                <Typography sx={{ mb: 2 }}>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.footer',
                      marginRight: '4px',
                    }}
                  >
                    Add Personal Notes:
                  </Box>
                  <Box component="span">
                    Note down specific details or reminders about each job to
                    stay prepared and informed.
                  </Box>
                </Typography>
              </li>
            </ul>
            <Typography color="text.primary" margin="20px" gutterBottom>
              Whether you are actively job hunting or simply preparing for the
              next step in your career, Application Hub helps you stay on top of
              your progress. Designed with simplicity and functionality in mind,
              it is more than just an application tracker—it is a tool to
              empower your career journey.
            </Typography>
            <Typography margin="20px">
              Take control of your applications, stay organized, and achieve
              your goals with Application Hub.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Vision />
    </Box>
  )
}
