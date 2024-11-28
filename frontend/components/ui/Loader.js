import { Box, CircularProgress } from '@mui/material'

export default function Loader({ height = '100vh' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height,
      }}
    >
      <CircularProgress />
    </Box>
  )
}
