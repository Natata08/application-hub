'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, CircularProgress, Alert } from '@mui/material'
import ApplicationHeader from './ApplicationHeader'
import ResponsiveWrapper from '@/components/ui/ResponsiveWrapper'
import ControlButton from './ControlButton'
import StatusPanel from './StatusPanel'
import ManagePanel from './ManagePanel'
import ProtectedRoute from '@/components/ProtectedRoute'
import {
  ApplicationProvider,
  useApplicationContext,
} from '@/components/Context/ApplicationContext'

function Content() {
  const { application, isLoading, error } = useApplicationContext()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    let timeout
    if (isLoading) {
      timeout = setTimeout(() => {
        setShowError(true)
      }, 5000)
    } else {
      setShowError(false)
    }
    return () => clearTimeout(timeout)
  }, [isLoading])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || (showError && !application)) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {error || 'No application data available'}
      </Alert>
    )
  }

  if (application) {
    return (
      <Box component="main" sx={{ marginBottom: 4 }}>
        <ResponsiveWrapper>
          <Box>
            <ControlButton />
            <ApplicationHeader />
            <StatusPanel />
            <ManagePanel />
          </Box>
        </ResponsiveWrapper>
      </Box>
    )
  }
}

export default function Application() {
  const params = useParams()
  const { id } = params

  return (
    <ProtectedRoute>
      <ApplicationProvider id={id}>
        <Content />
      </ApplicationProvider>
    </ProtectedRoute>
  )
}
