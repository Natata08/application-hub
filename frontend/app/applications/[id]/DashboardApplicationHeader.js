'use client'
import { useParams } from 'next/navigation'
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Stack,
  Alert,
} from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export default function DashboardApplicationHeader({ application }) {
  return (
    <>
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
          <IconButton size="large" sx={{ color: 'accent.main' }}>
            <DeleteRoundedIcon />
          </IconButton>
          <IconButton size="large" sx={{ color: 'accent.main' }}>
            <CancelRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  )
}
