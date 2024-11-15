import { Box } from '@mui/material'

export default function CardRightCurve({
  width = '100vw',
  backgroundColor,
  padding = '40px 0',
  margin = '20px 0',
  children,
}) {
  return (
    <Box
      sx={{
        width,
        backgroundColor: backgroundColor || 'background.cardBlue',
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
