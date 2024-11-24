import { Box, Typography, Button } from '@mui/material'

const EmptyState = ({ onAction, subject = 'content', buttonText = 'Add' }) => (
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
      {`No ${subject} yet.`}
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center">
      {`Click button below to add some ${subject}.`}
    </Typography>
    <Button variant="contained" size="small" onClick={onAction}>
      {buttonText}
    </Button>
  </Box>
)

export default EmptyState
