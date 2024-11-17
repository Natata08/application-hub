'use client'
import { Typography, Stack, Link, Box, Button } from '@mui/material'
import ControlButton from './ControlButton'
import StatusPanel from './StatusPanel'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import AddIcon from '@mui/icons-material/Add'
import ManagePanel from './ManagePanel'

export default function DashboardApplication({ application }) {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <ControlButton />

      <Typography
        variant="h5"
        component="h5"
        sx={{
          pb: { xs: 0.5, sm: 2 },
          paddingX: 2,
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        {application.job_title}
      </Typography>

      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: { xs: 'column', sm: 'row' },
          paddingX: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" component="div" sx={{ pb: 0.5 }}>
            {application.name.toLocaleUpperCase()} {application.location}
          </Typography>
          <Link
            href={application.website}
            passHref
            sx={{
              display: application.website ? 'block' : 'none',
              pb: { xs: 1, md: 2 },
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              wordBreak: 'break-word',
            }}
          >
            {application.website}
          </Link>
        </Box>
        <Typography
          variant="body1"
          component="div"
          sx={{
            pb: 2,
            color: 'accent.main',
            fontSize: { xs: '1rem', sm: '1.5rem' },
          }}
        >
          {application.salary !== undefined && application.salary !== null ? (
            application.salary === 0 ? (
              'Unpaid'
            ) : (
              application.salary
            )
          ) : (
            <Button
              size="medium"
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
              }}
            >
              Add a salary
            </Button>
          )}
        </Typography>
      </Stack>
      <StatusPanel application={application} />
      <ManagePanel application={application} />
    </Box>
  )
}
