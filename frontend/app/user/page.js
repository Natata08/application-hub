'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
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
import { useApplications } from '../hooks/useApplications'
import { sortApplications } from '@/utils/sortApplications'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [userName, setUserName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({
    field: 'Created Date',
    direction: 'desc',
  })
  const { applications, isLoading, error } = useApplications()

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery)
    },
    300,
    [searchQuery]
  )

  useEffect(() => {
    const userInfo = getLocalStorageItem('userInfo')
    setUserName(userInfo?.first_name || '')
  }, [])

  const getFilteredApplications = () => {
    if (!debouncedSearchQuery.trim()) return applications

    return applications.filter((app) => {
      const searchKeyword = debouncedSearchQuery.toLowerCase()
      const companyName = app.company_name.toLowerCase()
      const jobTitle = app.job_title.toLowerCase()

      return (
        companyName.includes(searchKeyword) || jobTitle.includes(searchKeyword)
      )
    })
  }

  // Process applications: first search, then sort
  const processApplications = () => {
    const searchedApplications = getFilteredApplications(applications)
    return sortApplications(searchedApplications, sortConfig)
  }

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
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              isSearching={searchQuery !== debouncedSearchQuery}
            />
            <SortControl onSortApply={setSortConfig} />
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
            <ApplicationsBoard
              isActive={isActive}
              applications={processApplications()}
              isLoading={isLoading}
              error={error}
              searchQuery={debouncedSearchQuery}
            />
          </TabPanel>
        ))}

        <MotivationalQuote />
      </Container>
    </Box>
  )
}
