import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function DashboardHeader({ name }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', mb: 1 }}
      >
        {`${name}, welcome to your application tracking!`}
      </Typography>
      <Typography variant="body1">
        Manage your tasks, track your progress, and prepare for interviews
        smoothly — all in one place.
      </Typography>
    </Box>
  )
}
