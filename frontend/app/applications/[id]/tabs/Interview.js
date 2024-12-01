'use client'
import { useState, useCallback } from 'react'
import { Box, Typography, Link, Chip, Button, Stack, Card } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MenuButtonInterview from '../MenuButtonContactInterview'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import InterviewForm from '../forms/InterviewForm'

const Interview = () => {
  const [isVirtual, setIsVirtual] = useState(true)
  const isMobile = useIsMobile()
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const handleOpenAddModal = useCallback(() => {
    setOpenModalAdd(true)
  }, [])
  const handleCloseAddModal = () => setOpenModalAdd(false)

  return (
    <Box sx={{ marginTop: 4 }}>
      <Card
        sx={{
          padding: 2,
          marginBottom: 1,
          position: 'relative',
          paddingRight: 8,
        }}
      >
        <Box sx={{ position: 'absolute', top: 10, right: 8 }}>
          <MenuButtonInterview />
        </Box>
        <Stack
          sx={{
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'start',
            alignItems: 'center',
            paddingBottom: 1,
            gap: isMobile ? 1 : 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              minWidth: isMobile ? 'auto' : '150px',
            }}
          >
            02/12/2024 12:00
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textTransform: 'uppercase',
              textAlign: { xs: 'center', sm: 'left' },
              minWidth: isMobile ? 'auto' : '300px',
            }}
          >
            Case Study/Take-Home Assignment
          </Typography>
          <Chip
            label={isVirtual ? 'Online' : 'In-person'}
            sx={{
              minWidth: isMobile ? 'auto' : '100px',
            }}
          />
        </Stack>

        <Box>
          {isVirtual === true ? (
            <Link
              href="https://meet.google.com/tnu-dzqg-rwr"
              target="_blank"
              sx={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                wordBreak: 'break-word',
                fontSize: '1rem',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              https://meet.google.com/tnu-dzqg-rwr
              https://meet.google.com/tnu-dzqg-rwr
            </Link>
          ) : (
            <Typography
              variant="body1"
              sx={{
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Copenhagen
            </Typography>
          )}
        </Box>
      </Card>

      <Card
        sx={{
          padding: 2,
          marginBottom: 1,
          position: 'relative',
          paddingRight: 8,
        }}
      >
        <Box sx={{ position: 'absolute', top: 10, right: 8 }}>
          <MenuButtonInterview />
        </Box>
        <Stack
          sx={{
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'start',
            alignItems: 'center',
            paddingBottom: 1,
            gap: isMobile ? 1 : 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              minWidth: isMobile ? 'auto' : '150px',
            }}
          >
            28/11/2024 10:00
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textTransform: 'uppercase',
              textAlign: { xs: 'center', sm: 'left' },
              minWidth: isMobile ? 'auto' : '300px',
            }}
          >
            Initial Screening
          </Typography>
          <Chip
            label={isVirtual === false ? 'Online' : 'In-Person'}
            sx={{
              minWidth: isMobile ? 'auto' : '100px',
            }}
          />
        </Stack>

        <Box>
          {isVirtual === false ? (
            <Link
              href="https://meet.google.com/tnu-dzqg-rwr"
              target="_blank"
              sx={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                wordBreak: 'break-word',
                fontSize: '1rem',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              https://meet.google.com/tnu-dzqg-rwr
              https://meet.google.com/tnu-dzqg-rwr
            </Link>
          ) : (
            <Typography
              variant="body1"
              sx={{
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Copenhagen
            </Typography>
          )}
        </Box>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleOpenAddModal}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Add Interview
        </Button>
      </Box>

      <InterviewForm
        mode="add"
        openModal={openModalAdd}
        onClose={handleCloseAddModal}
      />
    </Box>
  )
}

export default Interview
