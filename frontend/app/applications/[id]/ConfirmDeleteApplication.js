import { ModalWrapper } from '@/components/ui/ModalWrapper'
import { Button, Stack } from '@mui/material'

export default function ConfirmDeleteApplication({ openModal, onClose }) {
  const handleDeleteApplication = () => {
    //setOpenModal(false)
  }
  return (
    <ModalWrapper
      open={openModal}
      handleClose={onClose}
      title="Are you sure you want to delete this application?"
    >
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          paddingY: 2,
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
        <Button
          variant="contained"
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={handleDeleteApplication}
        >
          Yes, delete the application
        </Button>
      </Stack>
    </ModalWrapper>
  )
}
