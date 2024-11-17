'use client'
import { useParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import DashboardApplication from './DashboardApplication'
import { useApplicationById } from '@/app/hooks/useApplicationById'
import ResponsiveWrapper from '@/components/ui/ResponsiveWrapper'

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
    <Box component="main">
      <ResponsiveWrapper>
        <DashboardApplication application={application} />
      </ResponsiveWrapper>
    </Box>
  )
}
