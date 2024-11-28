'use client'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ContactForm from './forms/ContactForm'
import ContactDeleteModal from './forms/ContactDeleteModal'

const stylesIconButton = {
  fontSize: 20,
  marginRight: 2,
}

export default function MenuButtonContact() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModalEdition, setOpenModalEdition] = useState(false)
  const [openModalDeletion, setOpenModalDeletion] = useState(false)

  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenEditionModal = () => {
    setOpenModalEdition(true)
    handleMenuClose()
  }

  const handleOpenDeletionModal = () => {
    setOpenModalDeletion(true)
    handleMenuClose()
  }

  const handleCloseEditionModal = () => setOpenModalEdition(false)
  const handleCloseDeletionModal = () => setOpenModalDeletion(false)

  return (
    <>
      <IconButton
        aria-label="more"
        id="menu-button"
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: 'secondary.main' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            style: {
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenEditionModal}>
          <EditIcon sx={stylesIconButton} /> Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeletionModal}>
          <DeleteRoundedIcon sx={stylesIconButton} /> Delete
        </MenuItem>
      </Menu>

      <ContactForm
        mode="edit"
        openModal={openModalEdition}
        onClose={handleCloseEditionModal}
      />
      <ContactDeleteModal
        openModal={openModalDeletion}
        onClose={handleCloseDeletionModal}
      />
    </>
  )
}
