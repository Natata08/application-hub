'use client'
import * as React from 'react'
import {
  Box,
  Stack,
  Card,
  CardContent,
  Button,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'

export default function Contacts() {
  const isMobile = useIsMobileSmall()
  return (
    <Box>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          justifyContent: 'start',
          alignItems: { xs: 'stretch', sm: 'center' },
          pb: 2,
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 600,
              }}
            >
              Alice Johnson
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              HR Manager
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              +123456789
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              alice.johnson@itcompany.com
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 600,
              }}
            >
              Bob Williams
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Software Developer
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              +0987654321
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              bob.williams@itcompany.com
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          textTransform: 'none',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        Add Contact
      </Button>
    </Box>
  )
}
