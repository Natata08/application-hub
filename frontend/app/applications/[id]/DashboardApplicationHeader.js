'use client'
import { Typography, Stack } from '@mui/material'
import ControlPanel from './ControlPanel'

export default function DashboardApplicationHeader({ application }) {
  return (
    <>
      <ControlPanel />
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Stack direction="column">
          <Typography variant="h4" component="h4" sx={{ pb: 2 }}>
            {application.job_title}
          </Typography>
          <Typography variant="h5" component="h5" sx={{ pb: 2 }}>
            {application.name.toLocaleUpperCase()}
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography sx={{ color: 'accent.main' }}>
            {application.status.toLocaleUpperCase()}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}
