import Link from 'next/link'
import { Card, Typography, Box } from '@mui/material'
import formatRelativeTime from '@/utils/formatDate'

export default function ApplicationCard({ application }) {
  return (
    <Link
      href={`user/applications/${application.application_id}`}
      passHref
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <Card
        sx={{
          p: 1.5,
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          borderRadius: 2,
          '&:hover': {
            boxShadow: 3,
          },
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {application.company_name.toUpperCase()}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ fontWeight: '600', lineHeight: '1.5' }}
        >
          {application.job_title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formatRelativeTime(application.created_at)}
          </Typography>
        </Box>
      </Card>
    </Link>
  )
}
