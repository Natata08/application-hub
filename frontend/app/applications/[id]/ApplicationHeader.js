'use client'
import { Typography, Stack, Link, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useIsMobile } from '@/app/hooks/useIsMobile'

export default function ApplicationHeader({ application }) {
  const isMobile = useIsMobile()
  return (
    <Box>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
          pb: { xs: 0.5, sm: 2 },
          paddingX: 2,
          fontWeight: 600,
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
          <Typography
            component="h2"
            sx={{ pb: 0.5, fontSize: { xs: '1rem', sm: '1.2rem' } }}
          >
            {application.name} {application.location}
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
          component="p"
          sx={{
            pb: 2,
            color: 'secondary.main',
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
    </Box>
  )
}
