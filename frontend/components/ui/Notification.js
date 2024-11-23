'use client'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Notification({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
