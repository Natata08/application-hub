'use client'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import ApplicationHeader from './ApplicationHeader'
import { useApplicationById } from '@/app/hooks/useApplicationById'
import ResponsiveWrapper from '@/components/ui/ResponsiveWrapper'
import ControlButton from './ControlButton'
import StatusPanel from './StatusPanel'
import ManagePanel from './ManagePanel'
import ProtectedRoute from '@/components/ProtectedRoute'

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
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    )
  }

  return (
    <ProtectedRoute>
      <Box component="main" sx={{ marginBottom: 4 }}>
        <ResponsiveWrapper>
          <Box>
            <ControlButton />
            <ApplicationHeader application={application} />
            <StatusPanel application={application} />
            <ManagePanel application={application} />
          </Box>
        </ResponsiveWrapper>
      </Box>
    </ProtectedRoute>
  )
}
