import { Box, Card, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'

export default function Vision() {
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
      <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/vision-blue.jpg"
          alt="Vision"
          width={500}
          height={400}
          priority
          style={{
            height: 'auto',
            borderRadius: '15px',
            width: '100%',
            maxWidth: '500px',
          }}
        />
      </Grid>
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
              variant="h3"
              component="h3"
              textAlign="left"
              color="text.footer"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                mt: 4,
                typography: { xs: 'h5', sm: 'h5', md: 'h4' },
              }}
            >
              Our Vision
            </Typography>
            <Typography color="text.primary" gutterBottom sx={{ mb: 3 }}>
              We believe everyone deserves a stress-free job search experience.
              By providing tools that keep you organized and motivated, we aim
              to revolutionize how job seekers interact with opportunities and
              achieve their goals.
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
                Application Hub
              </Box>
              was designed with you in mind. Unlike generic organizational
              tools, we focus exclusively on the needs of job seekers, ensuring
              our features align with your priorities. Whether you are actively
              job hunting or exploring future opportunities, we are here to make
              your journey smoother, smarter, and more successful.
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
                Continuous Improvement:
              </Box>
              &quot;We are committed to constantly evolving and adapting to the
              changing landscape of the job market. Our vision is to provide job
              seekers with innovative features that anticipate their needs and
              deliver smarter solutions, making every application process
              smoother and more efficient.&quot;
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
