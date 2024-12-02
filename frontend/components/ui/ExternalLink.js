import React from 'react'
import { Stack, Typography, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const ExternalLink = ({ children, link }) => (
  <Link
    href={link}
    target="_blank"
    sx={{
      color: 'text.primary',
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline' },
      wordBreak: 'break-word',
      fontSize: '1rem',
    }}
  >
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <OpenInNewIcon
        sx={{ fontSize: 16, marginRight: 1, color: 'text.primary' }}
      />
      <Typography
        sx={{
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
        {children || link}
      </Typography>
    </Stack>
  </Link>
)
export default ExternalLink
