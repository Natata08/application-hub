'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import NotesIcon from '@mui/icons-material/Notes'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import EditIcon from '@mui/icons-material/Edit'
import PeopleIcon from '@mui/icons-material/People'
import PreviewIcon from '@mui/icons-material/Preview'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'
import Overview from './Overview'
import Contacts from './Contacts'
import Notes from './Notes'
import Interview from './Interview'
import Documents from './Documents'

const tabStyles = {
  minWidth: '42px',
  width: 'auto',
  minHeight: 40,
  height: 'auto',
}

const tabItems = [
  { label: 'Overview', value: 'Overview', icon: <PreviewIcon /> },
  { label: 'Notes', value: 'Notes', icon: <NotesIcon /> },
  { label: 'Interview', value: 'Interview', icon: <PeopleIcon /> },
  { label: 'Documents', value: 'Documents', icon: <InsertDriveFileIcon /> },
  { label: 'Contacts', value: 'Contacts', icon: <EditIcon /> },
]

const components = {
  Overview: Overview,
  Notes: Notes,
  Interview: Interview,
  Documents: Documents,
  Contacts: Contacts,
}

export default function ManagePanel() {
  const [value, setValue] = useState('Overview')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabItems.map((item) => (
              <Tab
                key={item.name}
                // label= {useIsMobileSmall() ? '' : item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
                iconPosition="start"
                sx={tabStyles}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel value="Overview">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}
