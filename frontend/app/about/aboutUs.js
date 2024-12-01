import { Box, Card, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-around"
      margin="20px auto"
      sx={{
        mt: { xs: 1, sm: 6, md: 10 },
      }}
    >
      <Grid xs={12} md={6}>
        <Card
          style={{
            maxWidth: '800px',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h4"
              textAlign="left"
              color="text.footer"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                mt: 3,
                typography: { xs: 'h5', sm: 'h5', md: 'h4' },
              }}
            >
              About us
            </Typography>
            <Typography
              color="text.primary"
              textAlign="left"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Your career journey made seamless.
            </Typography>
            <Typography color="text.primary" gutterBottom sx={{ mb: 3 }}>
              At
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.footer',
                  marginLeft: '4px',
                }}
              >
                Application Hub
              </Box>
              , we understand that navigating the job market can be
              overwhelming. Between tailoring resumes, keeping track of
              application deadlines, and preparing for interviews, staying
              organized is crucial. That is why we created a platform that
              simplifies the process, empowering job seekers to focus on what
              truly matters—landing their dream job.
            </Typography>
            <Typography color="text.primary" gutterBottom sx={{ mb: 2 }}>
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.footer',
                  marginRight: '4px',
                }}
              >
                Our mission
              </Box>
              is to take the stress out of job searching by providing an
              intuitive, user-friendly solution to help you manage every step of
              your application process. Whether you are applying for your first
              job or transitioning into a new field,
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.footer',
                  margin: '0 4px',
                }}
              >
                Application Hub
              </Box>
              is here to support you every step of the way.
            </Typography>
            <Typography color="text.primary" gutterBottom sx={{ mb: 3 }}>
              &quot;We strive to level the playing field for job seekers by
              providing easy-to-use tools that ensure everyone, regardless of
              background, can pursue their career goals effectively.&quot;
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/application_management.jpg"
          alt="Illustration of application management"
          width={500}
          height={400}
          priority
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',

            borderRadius: '15px',
          }}
        />
      </Grid>
    </Grid>
  )
}
