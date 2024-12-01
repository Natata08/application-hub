'use client'
import { Stack, Card, Typography, Box, Chip, Link } from '@mui/material'
import MenuButtonInterview from '../MenuButtonInterview'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { formatDate } from '@/utils/formatDate'
export default function InterviewCard({ interview }) {
  const isMobile = useIsMobile()
  const MeetingLink = ({ link }) => {
    return (
      <Link
        href={link}
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
        {link}
      </Link>
    )
  }

  const renderFormat = (isVirtual) => {
    if (isVirtual === null) {
      return (
        <Typography component="p" variant="overline" color="comment.main">
          Format
        </Typography>
      )
    } else {
      return (
        <Chip
          label={isVirtual ? 'Online' : 'In-Person'}
          sx={{ minWidth: isMobile ? 'auto' : '100px' }}
        />
      )
    }
  }

  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 1,
        position: 'relative',
        paddingRight: 8,
      }}
    >
      <Box sx={{ position: 'absolute', top: 10, right: 8 }}>
        <MenuButtonInterview interview={interview} />
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
          {formatDate(interview.scheduledAt)}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textTransform: 'uppercase',
            textAlign: { xs: 'center', sm: 'left' },
            minWidth: isMobile ? 'auto' : '300px',
          }}
        >
          {interview.type}
        </Typography>

        {renderFormat(interview.isVirtual)}
      </Stack>

      <Box>
        {interview.isVirtual ? (
          interview.location ? (
            <MeetingLink link={interview.location} />
          ) : (
            <Typography component="p" variant="overline" color="comment.main">
              Meeting Link
            </Typography>
          )
        ) : interview.location ? (
          <Typography
            variant="body1"
            sx={{ textAlign: isMobile ? 'center' : 'left' }}
          >
            {interview.location}
          </Typography>
        ) : (
          <Typography component="p" variant="overline" color="comment.main">
            Location
          </Typography>
        )}
      </Box>
    </Card>
  )
}
