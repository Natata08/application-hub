'use client'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useNotification } from '../Context/NotificationContext'

export default function Notification() {
  const { open, message, severity, hideNotification } = useNotification()

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={hideNotification}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
