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
  const statuses = isActive ? activeStatuses : inactiveStatuses
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
        <StatusColumn key={status.name} status={status} />
      ))}
    </Box>
  )
}
