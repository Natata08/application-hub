import { Box, CircularProgress, Alert } from '@mui/material'
import StatusColumn from './StatusColumn'
import EmptyState from './EmptyState'

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

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        '@media (min-width: 450px) and (max-width: 600px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        gap: {
          xs: 2,
          md: 3,
        },
        width: '100%',
      }}
    >
      {statuses.map((status) => (
        <StatusColumn
          key={status.name}
          status={status}
          applications={applications.filter(
            (app) => app.status === status.name
          )}
        />
      ))}
    </Box>
  )
}
