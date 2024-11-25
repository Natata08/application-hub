'use client'
import { useParams } from 'next/navigation'
import { Box, CircularProgress, Alert } from '@mui/material'
import ApplicationHeader from './ApplicationHeader'
import ResponsiveWrapper from '@/components/ui/ResponsiveWrapper'
import ManagePanel from './ManagePanel'
import ProtectedRoute from '@/components/ProtectedRoute'
import {
  ApplicationProvider,
  useApplicationContext,
} from '@/components/Context/ApplicationContext'
import { NotificationProvider } from '@/components/Context/NotificationContext'
import Notification from '../../../components/ui/Notification'

const Content = () => {
  const { application, isLoading, error } = useApplicationContext()

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

  return (
    <Box component="main" sx={{ marginBottom: 4 }}>
      <ResponsiveWrapper>
        <Box>
          {application && (
            <>
              <ApplicationHeader />
              <ManagePanel />
            </>
          )}
        </Box>
      </ResponsiveWrapper>
    </Box>
  )
}

export default function Application() {
  const params = useParams()
  const { id } = params

  return (
    <ProtectedRoute>
      <NotificationProvider>
        <ApplicationProvider id={id}>
          <Notification />
          <Content />
        </ApplicationProvider>
      </NotificationProvider>
    </ProtectedRoute>
  )
}
