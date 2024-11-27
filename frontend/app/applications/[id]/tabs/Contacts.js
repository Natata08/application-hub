'use client'
import { useState, useCallback } from 'react'
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
import MenuButtonContact from '../MenuButtonContact'
import ContactForm from '../forms/ContactForm'

export default function Contacts() {
  const [value, setValue] = useState('')
  const isMobile = useIsMobileSmall()
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const handleOpenAddModal = useCallback(() => {
    setOpenModalAdd(true)
  }, [])
  const handleCloseAddModal = () => setOpenModalAdd(false)

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          justifyContent: 'start',
          alignItems: { xs: 'stretch', sm: 'center' },
          pb: 2,
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Stack
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 600,
                }}
              >
                Alice Johnson
              </Typography>

              <MenuButtonContact />
            </Stack>

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
      </Stack>

      <Button
        onClick={handleOpenAddModal}
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          textTransform: 'none',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        Add Contact
      </Button>

      <ContactForm
        mode="add"
        openModal={openModalAdd}
        onClose={handleCloseAddModal}
      />
    </Box>
  )
}
