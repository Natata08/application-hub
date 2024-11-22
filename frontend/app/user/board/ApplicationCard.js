import Link from 'next/link'
import { Card, Typography, Box } from '@mui/material'
import formatRelativeTime from '@/utils/formatDate'
import { memo } from 'react'
export default memo(function ApplicationCard({ application }) {
  return (
    <Link
      href={`/applications/${application.application_id}`}
      passHref
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <Card
        sx={{
          p: 1,
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          borderRadius: 2,
          backgroundColor: 'background.default',
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {application.company_name.toUpperCase()}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ fontWeight: '600', lineHeight: '1' }}
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
})
