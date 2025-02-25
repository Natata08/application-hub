'use client'

import { SORT_FIELDS, SORT_DIRECTIONS } from '@/constants/sort'
import { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import { useDebounce } from 'react-use'
import { Container, Box, Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DashboardHeader from './DashboardHeader'
import TabsControl from './tabs/TabsControl'
import SearchField from './SearchField'
import SortControl from './SortControl'
import TabPanel from './tabs/TabPanel'
import ApplicationsBoard from './board/ApplicationsBoard'
const MotivationalQuote = lazy(() => import('./MotivationalQuote'))
import { getLocalStorageItem } from '@/utils/localStorage'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [userName, setUserName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({
    field: SORT_FIELDS.CREATED_DATE,
    direction: SORT_DIRECTIONS.DESC,
  })
  const router = useRouter()

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

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue)
  }, [])

  const handleAddApplicationClick = () => {
    router.push('/applications/add')
  }

  return (
    <ProtectedRoute>
      <Box component="main">
        <Container sx={{ p: 2, maxWidth: '1200px', margin: '0 auto' }}>
          <DashboardHeader name={userName} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 1, md: 0 },
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
                gap: 1,
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
                onClick={handleAddApplicationClick}
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
                searchQuery={debouncedSearchQuery}
                sortConfig={sortConfig}
              />
            </TabPanel>
          ))}

          <Suspense fallback={null}>
            <MotivationalQuote />
          </Suspense>
        </Container>
      </Box>
    </ProtectedRoute>
  )
}
