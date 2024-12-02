'use client'
import { Stack, Card, Typography, Box, Chip } from '@mui/material'
import MenuButtonInterview from '../MenuButtonInterview'
import { formatDateTime } from '@/utils/formatDate'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ExternalLink from '@/components/ui/ExternalLink'

const styles = {
  card: {
    padding: 2,
    position: 'relative',
    paddingRight: 6,
    flex: '1 1 100%',
    width: { xs: '100%', md: '80%' },
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 8,
  },
  stack: {
    alignItems: { xs: 'center', sm: 'start' },
    flexDirection: 'column',
    justifyContent: { xs: 'center', sm: 'center' },
    gap: { xs: 1, sm: 2 },
  },
  rowStack: {
    flexDirection: 'row',
    gap: { xs: 1, sm: 2 },
  },
  text: {
    textAlign: { xs: 'center', sm: 'left' },
  },
}

export default function InterviewCard({
  interview,
  onInterviewDeleted,
  onInterviewEdited,
}) {
  const renderLocation = () => {
    if (interview.isVirtual) {
      return interview.location ? (
        <ExternalLink link={interview.location} />
      ) : (
        <Typography component="p" variant="overline" color="comment.main">
          Meeting Link
        </Typography>
      )
    }
    return interview.location ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LocationOnIcon sx={{ fontSize: 16, marginRight: 1 }} />
        <Typography variant="body1" sx={styles.text}>
          {' '}
          {interview.location}
        </Typography>
      </Box>
    ) : (
      <Typography component="p" variant="overline" color="comment.main">
        Location
      </Typography>
    )
  }

  return (
    <Card sx={styles.card}>
      <Box sx={styles.menuButton}>
        <MenuButtonInterview
          interview={interview}
          onInterviewDeleted={onInterviewDeleted}
          onInterviewEdited={onInterviewEdited}
          interviewId={interview.interviewId}
        />
      </Box>
      <Stack sx={styles.stack}>
        <Stack sx={styles.rowStack}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              ...styles.text,
              width: { xs: 'auto', sm: '200px' },
            }}
          >
            {formatDateTime(interview.scheduledAt)}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'secondary.main',
              textTransform: 'uppercase',
              ...styles.text,
            }}
          >
            {interview.type}
          </Typography>
        </Stack>
        <Stack
          sx={{
            ...styles.stack,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
          }}
        >
          <Chip
            label={interview.isVirtual ? 'Online' : 'In-Person'}
            sx={{ minWidth: '100px' }}
          />
          {renderLocation()}
        </Stack>
      </Stack>
    </Card>
  )
}
