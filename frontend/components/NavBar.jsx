"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

export default function NavBar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="./transparentLogo.png"
            width={200}
            height={150}
            alt="logo"
          />
        </Typography>

        <IconButton
          color="inherit"
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Link href="/" passHref>
            <Button color="inherit" sx={{ margin: "10px", color: "black" }}>
              Home
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button color="inherit" sx={{ margin: "10px", color: "black" }}>
              About
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button color="inherit" sx={{ margin: "10px", color: "black" }}>
              Dashboard
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              sx={{
                backgroundColor: theme.palette.background.buttonSecondary,
                color: theme.palette.text.primary,
                fontWeight: "bold",
                margin: "10px",
                "&:hover": {
                  backgroundColor: theme.palette.background.paperYellow,
                },
              }}
            >
              LogIn
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button
              sx={{
                backgroundColor: theme.palette.background.cardGreen,
                color: theme.palette.text.secondary,
                fontWeight: "bold",
                margin: "10px",
                "&:hover": {
                  backgroundColor: theme.palette.background.paperYellow,
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          <Link href="/" passHref>
            <Button
              color="inherit"
              sx={{ margin: "10px", width: "100%", textAlign: "left" }}
            >
              Home
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button
              color="inherit"
              sx={{ margin: "10px", width: "100%", textAlign: "left" }}
            >
              About
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button
              color="inherit"
              sx={{ margin: "10px", width: "100%", textAlign: "left" }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              sx={{
                backgroundColor: theme.palette.background.buttonSecondary,
                color: theme.palette.text.primary,
                fontWeight: "bold",
                margin: "10px",
                width: "100%",
                textAlign: "left",
                "&:hover": {
                  backgroundColor: theme.palette.background.paperYellow,
                },
              }}
            >
              LogIn
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button
              sx={{
                backgroundColor: theme.palette.background.cardGreen,
                color: theme.palette.text.secondary,
                fontWeight: "bold",
                margin: "10px",
                width: "100%",
                textAlign: "left",
                "&:hover": {
                  backgroundColor: theme.palette.background.paperYellow,
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Drawer>
    </AppBar>
  );
}
