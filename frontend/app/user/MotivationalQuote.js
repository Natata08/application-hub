'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Fade,
  Tooltip,
  Card,
  CardContent,
  Chip,
  Collapse,
  Fab,
} from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import RefreshIcon from '@mui/icons-material/Refresh'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CloseIcon from '@mui/icons-material/Close'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(
          'https://api.api-ninjas.com/v1/quotes?category=success',
          {
            headers: {
              'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch quote')
        }

        const data = await response.json()
        setQuote(data[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuote()
  }, [refresh])

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleShow = () => {
    setIsVisible(true)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <Collapse
        in={isVisible}
        orientation="horizontal"
        timeout={400}
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: 300,
            borderRadius: 4,
            bgcolor: 'background.paper',
            minHeight: isLoading ? 200 : 'auto',
          }}
        >
          <CardContent sx={{ position: 'relative', p: 3 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label="Daily Inspiration"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />

            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Tooltip title="Get new quote">
                <IconButton
                  onClick={handleRefresh}
                  size="small"
                  disabled={isLoading}
                  sx={{
                    mr: 1,
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'white',
                    },
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Close">
                <IconButton
                  onClick={handleClose}
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'warning.main',
                      color: 'white',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              sx={{
                mt: 4,
                mb: 2,
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isLoading ? 'center' : 'flex-start',
                alignItems: isLoading ? 'center' : 'flex-start',
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography color="error" sx={{ mb: 1 }}>
                    Sorry, no quotes today
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Try refreshing
                  </Typography>
                </Box>
              ) : (
                <>
                  <FormatQuoteIcon
                    sx={{
                      fontSize: 40,
                      color: 'primary.main',
                      opacity: 0.2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      color: 'text.primary',
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                    }}
                  >
                    {quote?.quote}
                  </Typography>
                </>
              )}
            </Box>

            {!isLoading && !error && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  — {quote?.author}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Collapse>

      {!isVisible && (
        <Fade in={!isVisible} timeout={400}>
          <Fab
            color="primary"
            size="small"
            onClick={handleShow}
            sx={{
              position: 'relative',
              zIndex: 1,
              boxShadow: 3,
            }}
          >
            <Tooltip title="Show inspiration">
              <LightbulbIcon />
            </Tooltip>
          </Fab>
        </Fade>
      )}
    </Box>
  )
}
