'use client'
import { useState } from 'react'
import { IconButton, Stack, Box, Link } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteApplicationConfirm from './DeleteApplicationConfirm'

const stylesIconButton = {
  color: 'accent.main',
}

const ControlPanel = () => {
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
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Link
          href={`/user`}
          passHref
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <IconButton sx={stylesIconButton}>
            <ArrowBackIcon />
          </IconButton>
        </Link>

        <Box>
          <IconButton sx={stylesIconButton}>
            <BorderColorIcon />
          </IconButton>
          <IconButton sx={stylesIconButton} onClick={handleOpenModal}>
            <DeleteRoundedIcon />
          </IconButton>
          <DeleteApplicationConfirm
            openModal={openModal}
            onClose={handleCloseModal}
          />
        </Box>
      </Stack>
    </>
  )
}

export default ControlPanel
