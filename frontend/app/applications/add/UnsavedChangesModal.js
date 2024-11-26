import React, { useState, useEffect } from 'react'
import { Modal, Fade, Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const UnsavedChangesModal = ({ dirtyFields, dirtyState }) => {
  const [showModal, setShowModal] = useState(false)
  const [nextRoute, setNextRoute] = useState(null)
  const router = useRouter()

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCancelLeave = () => {
    setShowModal(false)
  }

  // Confirm leaving and proceed with navigation
  const handleConfirmLeave = () => {
    setShowModal(false)
    if (nextRoute) {
      nextRoute() // Proceed with the stored route
    }
  }

  // Intercept navigation and show modal if there are unsaved changes
  useEffect(() => {
    const originalPush = router.push
    const interceptNavigation = async (url, as, options) => {
      if (Object.keys(dirtyFields).length !== 0 && dirtyState) {
        setNextRoute(() => () => originalPush(url, as, options)) // Store the next route
        handleOpenModal() // Open the modal
        return // Abort navigation
      }
      originalPush(url, as, options)
    }

    // Override the router.push method to intercept navigation
    router.push = interceptNavigation

    // Cleanup the router.push override
    return () => {
      router.push = originalPush
    }
  }, [dirtyFields, dirtyState, router])

  return (
    <Modal open={showModal} onClose={handleCancelLeave} closeAfterTransition>
      <Fade in={showModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '30px',
            padding: '30px',
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            You have unsaved changes. Are you sure you want to leave without
            saving?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              onClick={handleCancelLeave}
              color="primary"
            >
              Stay
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmLeave}
              color="secondary"
            >
              Leave
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default UnsavedChangesModal
