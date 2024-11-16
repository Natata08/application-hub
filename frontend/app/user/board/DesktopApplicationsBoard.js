import { Box } from '@mui/material'
import StatusColumn from './StatusColumn'

export default function DesktopApplicationsBoard({ statuses, applications }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
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
