'use client'

import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function TeamFona() {
  const teamMembers = [
    {
      name: 'Furkan Özbek',
      role: 'Full Stack Developer',
      image: '/team/Furkan.png',
      linkedinUrl: 'https://www.linkedin.com/in/furkan-%C3%B6zbek-151926127/',
    },
    {
      name: 'Olha Sashchuk',
      role: 'Full Stack Developer',
      image: '/team/Olha.jpeg',
      linkedinUrl: 'https://www.linkedin.com/in/olha-sashchuk/',
    },
    {
      name: 'Natalia Lapina',
      role: 'Full Stack Developer',
      image: '/team/Natalia.png',
      linkedinUrl: 'https://www.linkedin.com/in/natalia-lapina/',
    },
    {
      name: 'Ankita Ranjan Mishra',
      role: 'Full Stack Developer',
      image: '/team/Ankita.png',
      linkedinUrl: 'https://www.linkedin.com/in/ankita-ranjan-mishra/',
    },
  ]

  return (
    <Box sx={{ p: 4, mt: '50px', mb: '20px' }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
        gutterBottom
      >
        Our Team
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
        {teamMembers.map((member, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 500, mx: 'auto', height: '100%' }}>
              <CardMedia
                component="a"
                href={member.linkedinUrl}
                target="_blank"
                image={member.image}
                alt={`${member.name} Picture`}
                sx={{ height: 300, width: 300, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                  fontWeight="bold"
                >
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
