'use client'
import { Stack, Card, Typography, Box, Chip, Link } from '@mui/material'
import MenuButtonInterview from '../MenuButtonInterview'
import { formatDate } from '@/utils/formatDate'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LocationOnIcon from '@mui/icons-material/LocationOn'

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
    justifyContent: { xs: 'center', sm: 'start' },
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

const MeetingLink = ({ link }) => (
  <Box>
    <Link
      href={link}
      target="_blank"
      sx={{
        display: 'flex',
        alignItems: 'start',
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' },
        wordBreak: 'break-word',
        fontSize: '1rem',
      }}
    >
      <OpenInNewIcon sx={{ fontSize: 16, marginRight: '8px' }} />
      <Typography
        sx={{
          fontSize: '1rem',
          color: 'inherit',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: {
            xs: '200px',
            sm: '300px',
            md: '400px',
          },
        }}
      >
        {link}
      </Typography>
    </Link>
  </Box>
)

export default function InterviewCard({
  interview,
  onInterviewDeleted,
  onInterviewEdited,
}) {
  const renderLocation = () => {
    if (interview.isVirtual) {
      return interview.location ? (
        <MeetingLink link={interview.location} />
      ) : (
        <Typography component="p" variant="overline" color="comment.main">
          Meeting Link
        </Typography>
      )
    }
    return interview.location ? (
      <Typography variant="body1" sx={styles.text}>
        <LocationOnIcon sx={{ fontSize: 16 }} /> {interview.location}
      </Typography>
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
            {formatDate(interview.scheduledAt)}
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
          sx={{ ...styles.stack, flexDirection: { xs: 'column', sm: 'row' } }}
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
