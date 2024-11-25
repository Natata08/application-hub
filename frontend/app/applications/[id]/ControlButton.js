'use client'

import Link from 'next/link'
import { Button, Stack, Typography } from '@mui/material'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

const stylesIconButton = {
  color: 'secondary.main',
  fontSize: { xs: 20, sm: 24 },
}

export default function ControlButton() {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: { xs: 0, sm: 2 },
      }}
    >
      <Link href="/user" passHref>
        <Button>
          <KeyboardArrowLeft sx={stylesIconButton} />{' '}
          <Typography variant="button" color="secondary.main">
            back
          </Typography>
        </Button>
      </Link>
    </Stack>
  )
}
