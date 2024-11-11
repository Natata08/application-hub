import { Box } from '@mui/material'
import StatusColumn from './StatusColumn'

const activeStatuses = [
  { name: 'SAVED', count: 2 },
  { name: 'APPLIED', count: 2 },
  { name: 'INTERVIEW', count: 3 },
  { name: 'OFFER', count: 0 },
]

const inactiveStatuses = [
  { name: 'REJECTED', count: 2 },
  { name: 'WITHDRAWN', count: 2 },
]

export default function ApplicationsBoard({ isActive }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: {
          xs: 2,
          md: 3,
        },
        width: '100%',
      }}
    >
      {isActive &&
        activeStatuses.map((status) => (
          <StatusColumn key={status.name} status={status} />
        ))}
      {!isActive &&
        inactiveStatuses.map((status) => (
          <StatusColumn key={status.name} status={status} />
        ))}
    </Box>
  )
}
