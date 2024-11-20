import { Box } from '@mui/material'
import StatusColumn from './StatusColumn'

export default function DesktopApplicationsBoard({ applicationsByStatus }) {
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
      {applicationsByStatus.map(({ status, applications }) => (
        <StatusColumn
          key={status}
          status={{ status }}
          applications={applications}
        />
      ))}
    </Box>
  )
}
