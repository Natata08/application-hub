"use client";

import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paperGreen,
        color: theme.palette.text.secondary,
        py: 4,
        px: { xs: 2, sm: 8 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            <img src="./transparentLogo.png" alt="HUB" width={100} />
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            &copy; {new Date().getFullYear()} ApplicationHub
          </Typography>
          <Box sx={{ mt: 1 }}>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              color="inherit"
              size="small"
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            Learn
          </Typography>

          <Link href="/blog" color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Blog
          </Link>
          <Link href="/demo" color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Schedule a demo
          </Link>
          <Link color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Help Center
          </Link>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            Our company
          </Typography>
          <Link
            href="/privacy-policy"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            Privacy Policy
          </Link>
          <Link color="inherit" sx={{ display: "block", mb: 0.5 }}>
            User Terms
          </Link>
          <Link color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Careers
          </Link>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            Get in touch
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Contact us
          </Typography>

          <Typography variant="body2">
            <Link href="mailto:support@applicationhub.com" color="inherit">
              support@applicationhub.com
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
