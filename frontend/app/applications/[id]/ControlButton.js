'use client'
import { useState } from 'react'
import { IconButton, Stack, Box, Link } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ConfirmDeleteApplication from './ConfirmDeleteApplication'
import EditionFormApplication from './EditFormApplication'

const stylesIconButton = {
  color: 'secondary.main',
  fontSize: { xs: 20, sm: 24 },
}

const ControlButton = () => {
  const [openModalDeletion, setOpenModalDeletion] = useState(false)
  const [openModalEdition, setOpenModalEdition] = useState(false)
  const handleOpenModalDeletion = () => {
    setOpenModalDeletion(true)
  }

  const handleCloseModalDeletion = () => {
    setOpenModalDeletion(false)
  }

  const handleOpenModalEdition = () => {
    setOpenModalEdition(true)
  }

  const handleCloseModalEdition = () => {
    setOpenModalEdition(false)
  }

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
      <Link
        href={`/user`}
        passHref
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <IconButton>
          <ArrowBackIcon sx={stylesIconButton} />
        </IconButton>
      </Link>

      <Box>
        <IconButton onClick={handleOpenModalEdition}>
          <BorderColorIcon sx={stylesIconButton} />
        </IconButton>
        <EditionFormApplication
          openModal={openModalEdition}
          onClose={handleCloseModalEdition}
        />
        <IconButton onClick={handleOpenModalDeletion}>
          <DeleteRoundedIcon sx={stylesIconButton} />
        </IconButton>
        <ConfirmDeleteApplication
          openModal={openModalDeletion}
          onClose={handleCloseModalDeletion}
        />
      </Box>
    </Stack>
  )
}

export default ControlButton
