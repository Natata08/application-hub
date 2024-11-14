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

export default function DashboardApplicationHeader() {
  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Stack direction="column">
          <Typography variant="h4" component="h4" sx={{ pb: 2 }}>
            job_title
          </Typography>
          <Typography variant="h5" component="h5" sx={{ pb: 2 }}>
            name
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography sx={{ color: '#F4A261' }}>APPLIED</Typography>
          <IconButton size="large" sx={{ color: '#F4A261' }}>
            <DeleteRoundedIcon />
          </IconButton>
          <IconButton size="large" sx={{ color: '#F4A261' }}>
            <CancelRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  )
}
