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
import { fetchQuote } from '@/utils/api'

// Loading Component
const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
    }}
  >
    <CircularProgress size={24} />
  </Box>
)

// Error Component
const ErrorMessage = () => (
  <Box sx={{ width: '100%', textAlign: 'center' }}>
    <Typography color="error" sx={{ mb: 1 }}>
      Sorry, no quotes today
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Try refreshing
    </Typography>
  </Box>
)

// Quote Component
const QuoteDisplay = ({ quote }) => (
  <>
    <FormatQuoteIcon
      sx={{
        fontSize: 40,
        opacity: 0.2,
      }}
    />
    <Typography
      variant="body1"
      sx={{
        fontStyle: 'italic',
        lineHeight: 1.6,
        fontSize: '1.1rem',
      }}
    >
      {quote?.quote}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        width: '100%',
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
  </>
)

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchQuote(setQuote, setIsLoading, setError)

    return () => {
      // Cleanup function to cancel any pending requests
      setQuote(null)
      setIsLoading(false)
      setError(null)
    }
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
            bgcolor: 'background.default',
            minHeight: isLoading ? 200 : 'auto',
          }}
        >
          <CardContent sx={{ position: 'relative', p: 3 }}>
            {/* Daily Inspiration Chip */}
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label="Daily Inspiration"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'secondary.main'
                    : 'primary.main',
                color: 'background.default',
                '& .MuiChip-icon': {
                  color: 'background.default',
                },
              }}
            />

            {/* Update icon */}
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Tooltip title="Get new quote">
                <span>
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
                </span>
              </Tooltip>

              {/* Close icon */}
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
                gap: 2,
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isLoading ? 'center' : 'flex-start',
                alignItems: isLoading ? 'center' : 'flex-start',
              }}
            >
              {isLoading && <Loading />}
              {error && <ErrorMessage />}
              {!isLoading && !error && <QuoteDisplay quote={quote} />}
            </Box>
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
