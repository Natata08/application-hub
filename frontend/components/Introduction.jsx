import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Introduction() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          ApplicationHub
        </Typography>

        <Typography
          variant="h5"
          sx={{ color: theme.palette.text.primary, mb: 4 }}
        >
          Your all-in-one platform to organize and manage your job search. Track
          applications, set reminders, and stay on top of your career goals.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/register"
          sx={{
            backgroundColor: theme.palette.background.paperGreen,
            color: theme.palette.text.secondary,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.background.cardGreen,
            },
          }}
        >
          Sign Up
        </Button>
      </Container>
    </Box>
  );
}
