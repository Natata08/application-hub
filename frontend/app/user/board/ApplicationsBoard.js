import { useMemo } from 'react'
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

export default function ApplicationsBoard({
  isActive,
  applications,
  isLoading,
  error,
  searchQuery,
}) {
  const statuses = isActive ? ACTIVE_STATUSES : INACTIVE_STATUSES
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const applicationsByStatus = useMemo(() => {
    return applications.reduce(
      (acc, app) => {
        const statusIndex = acc.findIndex((s) => s.status === app.status)
        if (statusIndex !== -1) {
          acc[statusIndex].applications.push(app)
        }
        return acc
      },
      statuses.map((status) => ({ status: status.name, applications: [] }))
    )
  }, [statuses, applications])

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
    <MobileApplicationsBoard applicationsByStatus={applicationsByStatus} />
  ) : (
    <DesktopApplicationsBoard applicationsByStatus={applicationsByStatus} />
  )
}
