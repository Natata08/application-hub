'use client'
import { Typography, Button, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { ModalWrapper } from '@/components/ui/ModalWrapper'

export default function DeleteModal({
  openModal,
  onClose,
  title,
  error,
  loading,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
}) {
  return (
    <ModalWrapper open={openModal} handleClose={onClose} title={title}>
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
            {cancelLabel}
          </Button>
          {loading ? (
            <LoadingButton size="small" loading variant="outlined" disabled>
              Disabled
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 'auto' },
              }}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          )}
        </Stack>
      </Box>
    </ModalWrapper>
  )
}
