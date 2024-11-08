"use client";

import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomePage from "../components/HomePage";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <HomePage />
      {/* <Box
        component="main"
        sx={{ backgroundColor: theme.palette.background.cardYellow }}
      >
        <Container>
          <Typography>welcome to the FONA App</Typography>
        </Container>
      </Box> */}
    </>
  );
}
