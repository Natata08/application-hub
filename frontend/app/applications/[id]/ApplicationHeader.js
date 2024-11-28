'use client'
import { useState, useCallback } from 'react'
import NextLink from 'next/link'
import {
  Typography,
  Stack,
  Link,
  Box,
  IconButton,
  Divider,
  Button,
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import EditIcon from '@mui/icons-material/Edit'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import CompanyEditForm from './forms/CompanyEditForm'
import MenuButtonApplication from './MenuButtonApplication'

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
      <NextLink href="/user" passHref>
        <Button>
          <KeyboardArrowLeft
            sx={{ color: 'secondary.main', fontSize: { xs: 20, sm: 24 } }}
          />{' '}
          <Typography variant="button" color="secondary.main">
            back
          </Typography>
        </Button>
      </NextLink>
      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: 'row',
          paddingX: 2,
          paddingBottom: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            fontWeight: 600,
          }}
        >
          {application.job_title}
        </Typography>

        <MenuButtonApplication />
      </Stack>

      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          flexDirection: 'row',
          paddingX: 2,
        }}
      >
        <Box>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              textTransform: 'uppercase',
            }}
          >
            {application.company_name}
          </Typography>

          {application.company_location ? (
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
            >
              {application.company_location}
            </Typography>
          ) : (
            <Typography variant="overline" color="comment.main">
              location
            </Typography>
          )}

          {application.company_website ? (
            <Link
              href={application.company_website}
              target="_blank"
              sx={{
                display: application.company_website ? 'block' : 'none',
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

        <IconButton onClick={handleOpenModal}>
          <EditIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
        </IconButton>
      </Stack>

      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Stack
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="overline"
            color="comment.main"
            sx={{ height: '24px' }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {application.status}
          </Typography>
        </Stack>

        <Stack
          sx={{
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="overline"
            color="comment.main"
            sx={{ height: '24px' }}
          >
            Salary
          </Typography>

          <Typography
            component="div"
            sx={{
              color: 'secondary.main',
              fontSize: { xs: '1rem', sm: '1.5rem' },
              fontWeight: 600,
            }}
          >
            {Number(application.salary ?? 0) === 0
              ? application.salary
                ? 'Unpaid'
                : ''
              : new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(application.salary) + ' DKK'}
          </Typography>
        </Stack>
      </Stack>

      <Divider />

      <CompanyEditForm openModal={openModal} onClose={handleCloseModal} />
    </Box>
  )
}
