import { Box, Typography, Button } from '@mui/material'

const EmptyNotes = ({ onEdit }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      py: 4,
    }}
  >
    <Typography variant="body1" color="text.secondary" align="center">
      No notes yet.
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center">
      Click Edit to add some notes.
    </Typography>
    <Button variant="contained" size="small" onClick={onEdit}>
      Edit
    </Button>
  </Box>
)

export default EmptyNotes
