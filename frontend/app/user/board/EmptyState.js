import { Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import SearchOffIcon from '@mui/icons-material/SearchOff'

export default function EmptyState({ searchQuery }) {
  const isSearching = Boolean(searchQuery?.trim())

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        width: '100%',
        minHeight: 400,
      }}
    >
      {isSearching ? (
        <>
          <SearchOffIcon
            sx={{
              fontSize: 48,
              color: 'text.secondary',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            No results found
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {`No applications match "${searchQuery}"`}
          </Typography>
        </>
      ) : (
        <>
          <WorkOutlineIcon
            sx={{
              fontSize: 48,
              color: 'text.secondary',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            No applications yet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Start tracking your job applications
          </Typography>
        </>
      )}
    </Box>
  )
}
