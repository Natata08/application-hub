import { useThemeContext } from '@/components/styles/ThemeApp'
import { Box } from '@mui/material'

export default function CardRightCurve({
  width = '100vw',
  backgroundColor,
  padding = '40px 0',
  margin = '20px 0',
  children,
}) {
  const { isLightMode, darkTheme, lightTheme } = useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Box
      sx={{
        width,
        backgroundColor: backgroundColor || theme.palette.background.card,
        borderRadius: '0 100px 0 0',
        padding,
        color: theme.palette.text.secondary,
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
