import { useThemeContext } from '@/components/styles/ThemeApp'
import { Box } from '@mui/material'

export default function CardLeftCurve({
  width,
  backgroundColor,
  padding,
  margin,
  children,
}) {
  const { isLightMode, darkTheme, lightTheme } = useThemeContext()
  const theme = isLightMode ? lightTheme : darkTheme
  return (
    <Box
      sx={{
        width,
        backgroundColor: backgroundColor || theme.palette.background.footer,
        borderRadius: '100px 0 0 0',
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
