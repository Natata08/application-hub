import { useState, memo, useCallback } from 'react'
import { Box, Typography, Paper, Button, Chip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ApplicationCard from './ApplicationCard'

export default memo(function StatusColumn({ status, applications }) {
  const [showAll, setShowAll] = useState(false)
  const INITIAL_DISPLAY_NUMBER = 3

  const displayedApplications = showAll
    ? applications
    : applications.slice(0, INITIAL_DISPLAY_NUMBER)

  const hasMore = applications.length > INITIAL_DISPLAY_NUMBER

  const handleToggleShow = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        minWidth: 100,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 0.5,
          mb: 2,
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.dashboard',
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'medium', letterSpacing: 2 }}
        >
          {status.status.toUpperCase()}
        </Typography>
        <Chip
          label={applications.length}
          color="secondary"
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
          }}
        />
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {displayedApplications.map((application) => (
          <ApplicationCard
            key={application.application_id}
            application={application}
          />
        ))}

        {hasMore && (
          <Button
            onClick={handleToggleShow}
            endIcon={
              showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'secondary.main',
              },
            }}
          >
            {showAll ? 'Show less' : `Show more`}
          </Button>
        )}
      </Box>
    </Box>
  )
})
