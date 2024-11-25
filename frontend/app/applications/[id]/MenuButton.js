'use client'
// import { useState, useRef, useEffect, useCallback } from 'react';
// import IconButton from '@mui/material/Button';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Stack from '@mui/material/Stack';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
// import BorderColorIcon from '@mui/icons-material/BorderColor'
// import ApplicationEditForm from './forms/ApplicationEditForm'
// import ApplicationDeleteModal from './forms/ApplicationDeleteModal'

// const stylesIconButton = {
//   color: 'secondary.main',
//   fontSize: { xs: 20, sm: 24 },
// }

// export default function MenuButton() {
//   const [openModalDeletion, setOpenModalDeletion] = useState(false)
//   const [openModalEdition, setOpenModalEdition] = useState(false)
//   const [open, setOpen] = useState(false);
//   const anchorRef = useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleOpenModalDeletion = useCallback(() => {
//     setOpenModalDeletion(true);
//     setOpen(false);
//   }, [])

//   const handleCloseModalDeletion = useCallback(() => {
//     setOpenModalDeletion(false)
//   }, [])

//   const handleOpenModalEdition = useCallback(() => {
//     setOpenModalEdition(true);
//     setOpen(false);
//   }, [])

//   const handleCloseModalEdition = useCallback(() => {
//     setOpenModalEdition(false)
//   }, [])

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (

//       <div>
//         <IconButton
//           ref={anchorRef}
//           id="composition-button"
//           aria-controls={open ? 'composition-menu' : undefined}
//           aria-expanded={open ? 'true' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//           sx={{padding: 0}}
//         >
//           <MoreVertIcon sx={stylesIconButton}/>
//         </IconButton>
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           placement="bottom-start"
//           transition
//           disablePortal
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === 'bottom-start' ? 'left top' : 'left bottom',
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList
//                     autoFocusItem={open}
//                     id="composition-menu"
//                     aria-labelledby="composition-button"
//                   >
//                     <MenuItem onClick={handleOpenModalEdition}>  <BorderColorIcon sx={stylesIconButton} /> Edit</MenuItem>
//                     <MenuItem onClick={handleOpenModalDeletion}> <DeleteRoundedIcon sx={stylesIconButton} />Delete</MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//         <ApplicationEditForm
//         openModal={openModalEdition}
//         onClose={handleCloseModalEdition}
//       />

//       <ApplicationDeleteModal
//         openModal={openModalDeletion}
//         onClose={handleCloseModalDeletion}
//       />
//       </div>
//   );
// }

import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ApplicationEditForm from './forms/ApplicationEditForm'
import ApplicationDeleteModal from './forms/ApplicationDeleteModal'

const stylesIconButton = {
  fontSize: 20,
  marginRight: 2,
}

export default function LongMenu() {
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
    <div>
      {/* Кнопка для открытия меню */}
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

      {/* Меню с пунктами */}
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

      {/* Модальные окна */}
      <ApplicationEditForm
        openModal={openModalEdition}
        onClose={handleCloseEditionModal}
      />
      <ApplicationDeleteModal
        openModal={openModalDeletion}
        onClose={handleCloseDeletionModal}
      />
    </div>
  )
}
