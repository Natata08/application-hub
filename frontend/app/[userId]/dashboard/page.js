"use client";

import Container from "@mui/material/Container";
import ControlPanel from "./ControlPanel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage({ params }) {
  const userId = params.userId;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
        <ControlPanel tabValue={tabValue} onTabChange={handleTabChange} />

        {/* Main Content */}
        <CustomTabPanel value={tabValue} index={0}>
          <Box>
            <Typography variant='h6' sx={{ mb: 2 }}>
              In Progress Applications
            </Typography>
            {/* Add your "In Progress" content here */}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Box>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Completed Applications
            </Typography>
            {/* Add your "Done" content here */}
          </Box>
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
