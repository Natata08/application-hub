'use client'

import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function TeamFona() {
  const teamMembers = [
    {
      name: 'Furkan Özbek',
      role: 'Full Stack Developer',
      description: `I am a junior frontend developer with a strong foundation in modern web technologies, including React, Vue, JavaScript, HTML, CSS, Node.js, Next.js, Knex, MySQL, Git, and Material-UI (MUI). I am about to complete an intensive 8-month web development bootcamp at Hack Your Future, which has enhanced my expertise and practical skills. I am excited to leverage my technical knowledge and passion for frontend development to kickstart my career in building user-focused, responsive web applications.`,
      image: '/team/Furkan.png',
      linkedinUrl: 'https://www.linkedin.com/in/furkan-%C3%B6zbek-151926127/',
    },
    {
      name: 'Olha Sashchuk',
      role: 'Full Stack Developer',
      description: `I am Olha, a dedicated and self-motivated beginner full-stack developer with expertise in JavaScript, React, Node.js, HTML5, CSS3, Redux, React Router, React Hook Form, SASS, TailwindCSS, Netlify, Gulp, MUI, NPM, jQuery, Figma, and Jira.
I am passionate about front-end development and take pride in creating visually appealing, responsive, and user-friendly interfaces. Eager to contribute to dynamic projects, I aim to continuously grow my skills in modern web technologies.`,
      image: '/team/Olha.png',
      linkedinUrl: 'https://www.linkedin.com/in/olha-sashchuk/',
    },
    {
      name: 'Natalia Lapina',
      role: 'Full Stack Developer',
      description: `I am Natalia, a junior full-stack developer based in Copenhagen, Denmark, with expertise in JavaScript, React, Next.js, Node.js, Express.js, MySQL, and MongoDB. I developed a strong foundation in web development at HackYourFuture, where I honed my skills in creating dynamic, user-friendly applications using modern technologies like KnexJS, Material-UI, and AWS S3. Passionate about building applications that simplify everyday life, I am eager to bring my skills to impactful projects.`,
      image: '/team/Natalia.png',
      linkedinUrl: 'https://www.linkedin.com/in/natalia-lapina/',
    },
    {
      name: 'Ankita Ranjan Mishra',
      role: 'Full Stack Developer',
      description: `I am Ankita, a passionate developer with a keen interest in building full-stack web applications, solving complex coding challenges, and contributing to open-source projects. I have expertise in JavaScript, React.js, Next.js, Node.js, Express.js, and MySQL.
Currently, I am enhancing my proficiency in modern web technologies. I thrive on creating scalable, user-centric solutions and am excited to apply my skills to impactful projects.`,
      image: '/team/Ankita.png',
      linkedinUrl: 'https://www.linkedin.com/in/ankita-ranjan-mishra/',
    },
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mt: '50px' }}
        gutterBottom
      >
        Team- FONA
      </Typography>
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        color="text.footer"
        sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' } }}
        gutterBottom
      >
        (Facilitating Opportunities, Navigating Applications)
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
        {teamMembers.map((member, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 350, mx: 'auto', height: '100%' }}>
              <CardMedia
                component="a"
                href={member.linkedinUrl}
                target="_blank"
                image={member.image}
                alt={`${member.name} Picture`}
                sx={{ height: 300, objectFit: 'cover' }}
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
                <Typography variant="body2" color="text.primary">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
