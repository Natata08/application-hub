'use client'

import Container from '@mui/material/Container'
import ControlPanel from './ControlPanel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ApplicationsBoard from './applications/ApplicationsBoard'
import TabPanel from './tabs/TabPanel'
import MotivationalQuote from './MotivationalQuote'
import DashboardHeader from './DashboardHeader'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box component="main">
      <Container sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
        <DashboardHeader name="Name" />
        <ControlPanel tabValue={activeTab} onTabChange={handleTabChange} />

        {[true, false].map((isActive, index) => (
          <TabPanel key={`tab-${index}`} value={activeTab} index={index}>
            <ApplicationsBoard isActive={isActive} />
          </TabPanel>
        ))}

        <MotivationalQuote />
      </Container>
    </Box>
  )
}
