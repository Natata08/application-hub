'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { IconButton, Stack, Box } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ConfirmDeleteApplication from './forms/ConfirmDeleteApplication'
import ApplicationEditForm from './forms/ApplicationEditForm'

const stylesIconButton = {
  color: 'secondary.main',
  fontSize: { xs: 20, sm: 24 },
}

export default function ControlButton() {
  const [openModalDeletion, setOpenModalDeletion] = useState(false)
  const [openModalEdition, setOpenModalEdition] = useState(false)

  const handleOpenModalDeletion = useCallback(() => {
    setOpenModalDeletion(true)
  }, [])

  const handleCloseModalDeletion = useCallback(() => {
    setOpenModalDeletion(false)
  }, [])

  const handleOpenModalEdition = useCallback(() => {
    setOpenModalEdition(true)
  }, [])

  const handleCloseModalEdition = useCallback(() => {
    setOpenModalEdition(false)
  }, [])

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
        <IconButton>
          <ArrowBackIcon sx={stylesIconButton} />
        </IconButton>
      </Link>

      <Box>
        <IconButton onClick={handleOpenModalEdition}>
          <BorderColorIcon sx={stylesIconButton} />
        </IconButton>

        <IconButton onClick={handleOpenModalDeletion}>
          <DeleteRoundedIcon sx={stylesIconButton} />
        </IconButton>
      </Box>

      <ApplicationEditForm
        openModal={openModalEdition}
        onClose={handleCloseModalEdition}
      />

      <ConfirmDeleteApplication
        openModal={openModalDeletion}
        onClose={handleCloseModalDeletion}
      />
    </Stack>
  )
}
