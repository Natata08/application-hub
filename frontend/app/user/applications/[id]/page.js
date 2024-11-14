'use client'
import { Box, Container } from '@mui/material'
import DashboardApplicationMain from './DashboardApplicationMain'
import DashboardApplicationHeader from './DashboardApplicationHeader'

export default function Application() {
  return (
    <Box component="main" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <DashboardApplicationHeader />
        <DashboardApplicationMain />
      </Container>
    </Box>
  )
}
