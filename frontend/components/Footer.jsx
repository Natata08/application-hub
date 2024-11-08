import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#264240",
        color: "#fff",
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
            <img
              // src="data:image/jpeg;base64,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"
              alt="HUB"
              width={100}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
          <Typography variant="h6" sx={{ color: "#A4D0A4", mb: 1 }}>
            Learn
          </Typography>
          <Link
            href="/pricing"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            Pricing
          </Link>
          <Link href="/blog" color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Blog
          </Link>
          <Link href="/demo" color="inherit" sx={{ display: "block", mb: 0.5 }}>
            Schedule a demo
          </Link>
          <Link
            href="/help-center"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            Help Center
          </Link>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#A4D0A4", mb: 1 }}>
            Our company
          </Typography>
          <Link
            href="/privacy-policy"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/user-terms"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            User Terms
          </Link>
          <Link
            href="/careers"
            color="inherit"
            sx={{ display: "block", mb: 0.5 }}
          >
            Careers
          </Link>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#A4D0A4", mb: 1 }}>
            Get in touch
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Contact us
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            US: +1 (555) 123-4567
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            AU: +61 03 7036 8558
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            NZ: +64 9 888 8606
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
