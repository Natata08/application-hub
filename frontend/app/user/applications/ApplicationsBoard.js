import { Box } from '@mui/material'
import StatusColumn from './StatusColumn'

const activeStatuses = [
  { name: 'SAVED' },
  { name: 'APPLIED' },
  { name: 'INTERVIEW' },
  { name: 'OFFER' },
]

const inactiveStatuses = [{ name: 'REJECTED' }, { name: 'WITHDRAWN' }]

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
