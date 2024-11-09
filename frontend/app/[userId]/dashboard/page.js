"use client";

import Container from "@mui/material/Container";
import ControlPanel from "./ControlPanel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ApplicationBoard from "./ApplicationBoard";
import TabPanel from "./TabPanel";

export default function DashboardPage({ params }) {
  const userId = params.userId;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
        <ControlPanel tabValue={activeTab} onTabChange={handleTabChange} />

        {[true, false].map((isActive, index) => (
          <TabPanel key={`tab-${index}`} value={activeTab} index={index}>
            <ApplicationBoard isActive={isActive} />
          </TabPanel>
        ))}
      </Container>
    </Box>
  );
}
