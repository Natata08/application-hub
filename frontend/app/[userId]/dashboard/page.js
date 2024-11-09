"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MealDetailsPage({ params }) {
  const userId = params.userId;

  return (
    <Box component='main'>
      <Container sx={{ p: 4, maxWidth: "1200px", margin: "0 auto" }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant='h4'
            component='h2'
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {`${userId}, welcome to your application tracking!`}
          </Typography>
          <Typography variant='body1'>
            Manage your tasks, track your progress, and prepare for interviews
            smoothly — all in one place.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
