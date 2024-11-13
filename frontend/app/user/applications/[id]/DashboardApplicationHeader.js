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
//import { useApplicationById } from '@/app/hooks/useApplicationById'

export default function DashboardApplicationHeader() {
  // const params = useParams()
  // const id = params.id
  // const { application, isLoading, error } = useApplicationById(id)
  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }
  // if (error) {
  //   return (
  //     <Alert severity="error" sx={{ m: 4 }}>
  //       {error}
  //     </Alert>
  //   )
  // }
  // if (!application) return <Typography>No data available.</Typography>

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
