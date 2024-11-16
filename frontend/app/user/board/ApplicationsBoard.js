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

const activeStatuses = [
  { name: 'saved' },
  { name: 'applied' },
  { name: 'interview' },
  { name: 'offer' },
]

const inactiveStatuses = [{ name: 'rejected' }, { name: 'withdrawn' }]

export default function ApplicationsBoard({
  isActive,
  applications,
  isLoading,
  error,
  searchQuery,
}) {
  const statuses = isActive ? activeStatuses : inactiveStatuses

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
    <MobileApplicationsBoard statuses={statuses} applications={applications} />
  ) : (
    <DesktopApplicationsBoard statuses={statuses} applications={applications} />
  )
}
