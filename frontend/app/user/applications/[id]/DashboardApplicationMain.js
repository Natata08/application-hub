'use client'
import { useState } from 'react'
import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material'
import NotesIcon from '@mui/icons-material/Notes'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import EditIcon from '@mui/icons-material/Edit'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import PeopleIcon from '@mui/icons-material/People'
import PreviewIcon from '@mui/icons-material/Preview'
import Overview from './Overview'
import Edit from './Edit'
import Notes from './Notes'
import Interview from './Interview'
import Documents from './Documents'
import CustomDrawer from './CustomDrawer'

const drawerWidth = '160px'
const menuItems = [
  { name: 'Overview', icon: <PreviewIcon /> },
  { name: 'Edit', icon: <EditIcon /> },
  { name: 'Notes', icon: <NotesIcon /> },
  { name: 'Interview', icon: <PeopleIcon /> },
  { name: 'Documents', icon: <InsertDriveFileIcon /> },
]

const components = {
  Overview: <Overview />,
  Edit: <Edit />,
  Notes: <Notes />,
  Interview: <Interview />,
  Documents: <Documents />,
}

export default function DashboardApplicationMain() {
  const [activeComponent, setActiveComponent] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleButtonClick = (component) => {
    setActiveComponent(component)
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="relative">
        <Toolbar spacing={2}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuOpenIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ pl: 4 }}>
            Job Application Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 0,
          position: 'relative',
          bgcolor: '#C5D5D4',
        }}
      >
        <CustomDrawer
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          menuItems={menuItems}
          handleButtonClick={handleButtonClick}
        />
        <Box sx={{ flexGrow: 1, transition: 'margin-left 0.3s ease' }}>
          {components[activeComponent] || <Overview />}
        </Box>
      </Box>
    </Box>
  )
}
