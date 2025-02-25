import { Box } from '@mui/material'

export default function CardRightCurve({
  width = '100vw',
  backgroundColor,
  padding = '40px 0',
  margin = '0',
  children,
}) {
  return (
    <Box
      sx={{
        width,

        borderRadius: '0 100px 0 0',
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
