'use client'
import { Typography, Stack, Link, Box, Button } from '@mui/material'
import ControlButton from './ControlButton'
import StatusPanel from './StatusPanel'
import useIsMobile from '@/app/hooks/useIsMobile'
import AddIcon from '@mui/icons-material/Add'

export default function DashboardApplicationHeader({ application }) {
  const isMobile = useIsMobile()

  return (
    <Box>
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
            href="https://www.lego.com"
            passHref
            sx={{
              display: application.website ? 'block' : 'none',
              pb: { xs: 0, md: 2 },
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {application.website}
          </Link>
        </Box>
        <Typography variant="h5" component="h5" sx={{ pb: 2 }}>
          {application.salary === 0 ? 'Unpaid' : application.salary}

          {application.salary ? (
            application.salary
          ) : (
            <Button
              size="medium"
              variant="text"
              startIcon={<AddIcon />}
              // onClick={handleOpenModal}
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
    </Box>
  )
}
