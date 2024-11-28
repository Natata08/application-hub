import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const EmptyState = ({ onAction, subject = 'content', buttonText = 'Add' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      py: 4,
    }}
  >
    <Typography variant="body1" align="center">
      {`No ${subject} yet.`}
    </Typography>
    <Typography variant="body1" align="center">
      {`Click button below to add some ${subject}.`}
    </Typography>
    <Button
      onClick={onAction}
      variant="outlined"
      startIcon={<AddIcon />}
      sx={{
        textTransform: 'none',
      }}
    >
      {buttonText}
    </Button>
  </Box>
)

export default EmptyState
