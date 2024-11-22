'use client'
import { Paper, Modal, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
  maxHeight: '90vh',
  height: 'auto',
  overflowY: 'auto',
  padding: '16px',
  width: '100%',
  '@media (max-width: 900px)': {
    maxWidth: '90%',
  },
}

export const ModalWrapper = ({ open, handleClose, title, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'secondary.main',
            fontSize: { xs: 20, sm: 24 },
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          gutterBottom
          variant="h4"
          sx={{
            marginBottom: 0,
            paddingY: 2,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          {title}
        </Typography>
        {children}
      </Paper>
    </Modal>
  )
}
