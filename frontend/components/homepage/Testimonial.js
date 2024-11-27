import React from 'react'
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'

const testimonials = [
  {
    name: 'Alex Thompson',
    position: 'Computer Science Graduate',
    content: `"Application Hub has been a game-changer for me! Keeping track of job applications can be so overwhelming, especially when applying to multiple companies at once. With this tool, I can easily see the status of each application and make sure I don't miss any important updates."`,
  },
  {
    name: 'Priya Mehta',
    position: 'Marketing Student',
    content: `"Thanks to Application Hub, I no longer lose track of where I've applied and what stage I'm in. I can quickly see which jobs need follow-ups, which interviews are coming up, and which positions I am still waiting to hear back from."`,
  },
  {
    name: 'John Williams',
    position: 'Software Development Student',
    content: `"Application Hub has made my job search experience so much smoother. The interface is user-friendly, and I love being able to see all my applications and their current status at a glance. I feel a lot more in control of my job hunt with this tool!"`,
  },
]

export default function TestimonialComponent() {
  return (
    <>
      <Box marginTop={10}>
        <Grid
          container
          spacing={4}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          {testimonials.map((testimonial, index) => (
            <Grid
              xs={12}
              md={4}
              key={index}
              style={{ minWidth: '300px', maxWidth: '350px' }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: '350px',
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '15px',
                  padding: '20px',
                  margin: '15px',
                  backgroundColor: 'background.default',
                  color: 'text.primary',
                }}
              >
                <Grid container spacing={2}>
                  <Grid>
                    <Avatar src={testimonial.photo} alt={testimonial.name} />
                  </Grid>
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2">
                      {testimonial.position}
                    </Typography>
                  </Box>
                </Grid>
                <CardContent>
                  <Typography variant="body1" component="p">
                    {testimonial.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
