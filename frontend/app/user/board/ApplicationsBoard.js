import { useMemo, useState, useEffect } from 'react'
import {
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import EmptyState from './EmptyState'
import MobileApplicationsBoard from './MobileApplicationsBoard'
import DesktopApplicationsBoard from './DesktopApplicationsBoard'
import {
  ACTIVE_STATUSES,
  INACTIVE_STATUSES,
} from '@/constants/applicationStatus'
import { fetchApplications } from '@/utils/api'
import { sortApplications } from '@/utils/sortApplications'

export default function ApplicationsBoard({
  isActive,
  searchQuery,
  sortConfig,
}) {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const statuses = isActive ? ACTIVE_STATUSES : INACTIVE_STATUSES

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchApplications()
        setApplications(data)
      } catch (err) {
        setError(
          "We're having trouble loading your applications. Please try again later."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getApplications()
  }, [])

  // Process applications: filter, sort, and group by status
  const processedApplicationsByStatus = useMemo(() => {
    // filter by search query
    let filteredApplications = applications
    if (searchQuery?.trim()) {
      const searchKeyword = searchQuery.toLowerCase()
      filteredApplications = applications.filter((app) => {
        const companyName = app.company_name.toLowerCase()
        const jobTitle = app.job_title.toLowerCase()
        return (
          companyName.includes(searchKeyword) ||
          jobTitle.includes(searchKeyword)
        )
      })
    }

    // sort
    const sortedApplications = sortApplications(
      filteredApplications,
      sortConfig
    )

    // group by status
    return statuses.map((status) => ({
      status: status.name,
      applications: sortedApplications.filter(
        (app) => app.status === status.name
      ),
    }))
  }, [applications, searchQuery, sortConfig, statuses])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {error}
      </Alert>
    )
  }

  const hasApplications = applications.length > 0

  if (!hasApplications) {
    return <EmptyState searchQuery={searchQuery} />
  }

  return isMobile ? (
    <MobileApplicationsBoard
      applicationsByStatus={processedApplicationsByStatus}
    />
  ) : (
    <DesktopApplicationsBoard
      applicationsByStatus={processedApplicationsByStatus}
    />
  )
}
