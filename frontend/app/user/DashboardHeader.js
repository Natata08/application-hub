import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { memo } from 'react'

export default memo(function DashboardHeader({ name }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        mb: 1,
        pb: 1,
        borderBottom: '2px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant={isSmallScreen ? 'subtitle1' : 'h6'}
        component="h2"
        sx={{
          fontWeight: 'bold',
          lineHeight: 1.3,
          mb: 0.5,
        }}
      >
        {`${name ? `${name}, ` : ''}welcome to your application tracking!`}
      </Typography>
      <Typography variant={isSmallScreen ? 'body2' : 'body1'}>
        Manage your tasks, track your progress, and prepare for interviews
        smoothly — all in one place.
      </Typography>
    </Box>
  )
})
