'use client'
import { useState } from 'react'
import { deleteApplication } from '@/utils/api'
import { Typography, Button, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/navigation'
import { ModalWrapper } from '@/components/ui/ModalWrapper'
import { useNotification } from '@/components/Context/NotificationContext'
import { useApplicationContext } from '@/components/Context/ApplicationContext'

export default function ApplicationDeleteModal({ openModal, onClose }) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDeleteApplication = async () => {
    setLoading(true)
    setError('')
    try {
      await deleteApplication(application.application_id)
      router.push(`/user`)
      onClose()
      showNotification('Application was deleted!')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalWrapper
      open={openModal}
      handleClose={onClose}
      title="Are you sure you want to delete this application?"
    >
      <Box>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
            paddingBottom: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            No, keep the application
          </Button>
          {loading ? (
            <LoadingButton
              size="small"
              loading={loading}
              variant="outlined"
              disabled
            >
              Disabled
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 'auto' },
              }}
              onClick={handleDeleteApplication}
            >
              Yes, delete the application
            </Button>
          )}
        </Stack>
      </Box>
    </ModalWrapper>
  )
}
