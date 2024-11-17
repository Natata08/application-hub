'use client'
import { useState } from 'react'
import { IconButton, Stack, Box, Link } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ConfirmDeleteApplication from './ConfirmDeleteApplication'

const stylesIconButton = {
  color: 'secondary.main',
  fontSize: { xs: 20, sm: 24 },
}

const ControlButton = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
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
          <IconButton>
            <BorderColorIcon sx={stylesIconButton} />
          </IconButton>
          <IconButton onClick={handleOpenModal}>
            <DeleteRoundedIcon sx={stylesIconButton} />
          </IconButton>
          <ConfirmDeleteApplication
            openModal={openModal}
            onClose={handleCloseModal}
          />
        </Box>
      </Stack>
    </>
  )
}

export default ControlButton
