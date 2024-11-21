import { Box, Typography } from '@mui/material'
import NotesIcon from '@mui/icons-material/Notes'

const EmptyNotes = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      height: '300px',
    }}
  >
    <NotesIcon
      sx={{
        fontSize: 48,
        color: 'text.secondary',
        mb: 2,
      }}
    />
    <Typography variant="body1" color="text.secondary" align="center">
      No notes yet. Click Edit to add some notes.
    </Typography>
  </Box>
)

export default EmptyNotes
