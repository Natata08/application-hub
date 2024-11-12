'use client'

import { useState, useEffect } from 'react'
import { Container, Box, Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DashboardHeader from './DashboardHeader'
import TabsControl from './tabs/TabsControl'
import SearchField from './SearchField'
import SortControl from './SortControl'
import TabPanel from './tabs/TabPanel'
import ApplicationsBoard from './applications/ApplicationsBoard'
import MotivationalQuote from './MotivationalQuote'
import { getLocalStorageItem } from '@/utils/localStorage'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const userInfo = getLocalStorageItem('userInfo')
    setUserName(userInfo?.first_name || '')
  }, [])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box component="main">
      <Container sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
        <DashboardHeader name={userName} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 },
            width: '100%',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: '100%',
              order: { xs: 1, md: 2 },
              justifyContent: {
                xs: 'flex-start',
                sm: 'center',
                md: 'flex-end',
              },
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <SearchField />
            <SortControl />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
              }}
            >
              Add a job
            </Button>
          </Stack>
          <TabsControl tabValue={activeTab} onTabChange={handleTabChange} />
        </Box>
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
