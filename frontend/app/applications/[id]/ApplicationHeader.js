'use client'
import { useState, useCallback } from 'react'
import { Typography, Stack, Link, Box, IconButton, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import CompanyEditForm from './forms/CompanyEditForm'

export default function ApplicationHeader() {
  const { application } = useApplicationContext()
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  return (
    <Box>
      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
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
        <Paper sx={{ marginLeft: { xs: 2 }, mb: { xs: 1 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: '1rem',
              p: { xs: 0.5, sm: 1 },
              paddingX: 2,
              fontWeight: 600,
            }}
          >
            {application.status.toLocaleUpperCase()}
          </Typography>
        </Paper>
      </Stack>

      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: { xs: 'column', sm: 'row' },
          paddingX: 2,
        }}
      >
        <Box>
          <Stack
            sx={{
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Typography
              component="h3"
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
            >
              {application.company_name}
            </Typography>
            {application.company_location ? (
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
              >
                - {application.company_location}
              </Typography>
            ) : (
              <Typography variant="overline" color="comment.main">
                location
              </Typography>
            )}
            <IconButton onClick={handleOpenModal}>
              <EditIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
            </IconButton>
          </Stack>

          {application.company_website ? (
            <Link
              href={application.company_website}
              target="_blank"
              sx={{
                display: application.company_website ? 'block' : 'none',
                pb: { xs: 1, md: 2 },
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                wordBreak: 'break-word',
              }}
            >
              {application.company_website}
            </Link>
          ) : (
            <Typography variant="overline" component="div" color="comment.main">
              Website
            </Typography>
          )}
        </Box>
        <Typography
          component="p"
          sx={{
            pb: 2,
            color: 'secondary.main',
            fontSize: { xs: '1rem', sm: '1.5rem' },
          }}
        >
          {Number(application.salary ?? 0) === 0 ? (
            application.salary ? (
              'Unpaid'
            ) : (
              <Typography variant="overline" color="comment.main">
                Salary
              </Typography>
            )
          ) : (
            application.salary
          )}
        </Typography>
      </Stack>

      <CompanyEditForm openModal={openModal} onClose={handleCloseModal} />
    </Box>
  )
}
