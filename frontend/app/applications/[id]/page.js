'use client'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import DashboardApplicationMain from './DashboardApplicationMain'
import DashboardApplicationHeader from './DashboardApplicationHeader'
import { useApplicationById } from '@/app/hooks/useApplicationById'

export default function Application() {
  const params = useParams()
  const { id } = params

  const { application, isLoading, error } = useApplicationById(id)

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

  if (!application) {
    return <Typography>No application data available</Typography>
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Box component="main" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <DashboardApplicationHeader application={application} />
        <DashboardApplicationMain application={application} />
      </Container>
    </Box>
  )
}
