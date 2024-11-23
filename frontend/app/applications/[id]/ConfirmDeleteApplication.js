'use client'
import { useState } from 'react'
import { deleteApplication } from '@/utils/api'
import { Typography, Paper, Modal, Button, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/navigation'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  border: '0px solid #FFFF',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
  maxHeight: 600,
  overflowY: 'auto',
  padding: '16px',
  width: '100%',
  '@media (max-width: 900px)': {
    maxWidth: '90%',
  },
}

export default function ConfirmDeleteApplication({
  openModal,
  onClose,
  application,
}) {
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
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={openModal} onClose={onClose}>
      <Paper sx={style}>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Typography
          gutterBottom
          variant="h4"
          sx={{
            marginBottom: 0,
            paddingY: 4,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Are you sure you want to delete this application?
        </Typography>
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
      </Paper>
    </Modal>
  )
}
