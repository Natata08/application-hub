import { Box, Card, CardContent, Typography } from '@mui/material'
import CardLeftCurve from '@/components/ui/CardLeftCurve'

export default function About() {
  return (
    <Box margin="20px">
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        }}
      >
        Application Hub
      </Typography>
      <Typography
        textAlign="center"
        gutterBottom
        margin="20px"
        color="text.footer"
      >
        Welcome to Application Hub, your ultimate companion in managing your job
        applications effortlessly and effectively.
      </Typography>

      <CardLeftCurve backgroundColor={'background.cardBlue'}>
        <Card
          style={{
            maxWidth: '1000px',
            margin: '30px',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            maxHeight: '100%',
          }}
        >
          <CardContent>
            <Typography
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Searching for a job can be overwhelming, but staying organized
              should not be. With Application Hub, you can:
            </Typography>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>
                <Typography>
                  <Box component="span" sx={{ color: 'text.footer' }}>
                    <strong>Track Your Applications:</strong>
                  </Box>{' '}
                  <Box component="span" sx={{ color: 'text.primary' }}>
                    Keep a detailed record of every job you apply for, from
                    application date to current status.
                  </Box>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Box component="span" sx={{ color: 'text.footer' }}>
                    <strong>Maintain Company Details:</strong>
                  </Box>{' '}
                  <Box component="span" sx={{ color: 'text.primary' }}>
                    {' '}
                    Store important information about the companies you are
                    applying to, all in one place.
                  </Box>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Box component="span" sx={{ color: 'text.footer' }}>
                    <strong>Add Personal Notes:</strong>
                  </Box>{' '}
                  <Box component="span" sx={{ color: 'text.primary' }}>
                    {' '}
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
      </CardLeftCurve>
    </Box>
  )
}
