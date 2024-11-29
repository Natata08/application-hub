'use client'
import { useState, useCallback } from 'react'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'
import {
  Box,
  Typography,
  Paper,
  Link,
  Chip,
  Button,
  Stack,
  Card,
} from '@mui/material'
import EmptyState from './EmptyState'
import MenuButtonApplication from '../MenuButtonApplication'
import MenuButtonInterview from '../MenuButtonContactInterview'

const Interview = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isVirtual, setIsVirtual] = useState(true)
  const [value, setValue] = useState('')
  const isMobile = useIsMobileSmall()
  const hasContent = value
  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        {/* {!hasContent && !isEditing && (
        <EmptyState onAction={handleEdit} subject="interview" buttonText="Add Interview" />
      )} */}

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
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: isMobile ? 'center' : 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              28/11/2024
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textTransform: 'uppercase',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Initial Screening
            </Typography>
            <Chip label={isVirtual ? 'Online' : 'In-person'} />
            <Box>
              {isVirtual === true ? (
                <Link
                  href="https://github.com"
                  target="_blank"
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    wordBreak: 'break-word',
                    fontSize: '1rem',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  https://github.com
                </Link>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'uppercase',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Copenhagen
                </Typography>
              )}
            </Box>
          </Stack>
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
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: isMobile ? 'center' : 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              28/11/2024
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textTransform: 'uppercase',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Initial Screening
            </Typography>
            <Chip label={isVirtual === false ? 'Online' : 'In-person'} />
            <Box>
              {isVirtual === false ? (
                <Link
                  href="https://github.com"
                  target="_blank"
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    wordBreak: 'break-word',
                    fontSize: '1rem',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  https://github.com
                </Link>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'uppercase',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Copenhagen
                </Typography>
              )}
            </Box>
          </Stack>
        </Card>
      </Box>
    </>
  )
}

export default Interview
