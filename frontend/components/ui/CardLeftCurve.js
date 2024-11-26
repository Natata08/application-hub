import { Box } from '@mui/material'

export default function CardLeftCurve({
  width,
  backgroundColor,
  padding,
  margin,
  children,
}) {
  return (
    <Box
      sx={{
        width,
        borderRadius: '100px 0 0 0',
        padding,
        color: 'text.secondary',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        margin,
      }}
    >
      {children}
    </Box>
  )
}
