'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import NotesIcon from '@mui/icons-material/Notes'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import PeopleIcon from '@mui/icons-material/People'
import PreviewIcon from '@mui/icons-material/Preview'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'
import JobInfo from './JobInfo'
import Contacts from './Contacts'
import Notes from './Notes'
import Interview from './Interview'
import Documents from './Documents'
import { useThemeContext } from '@/components/styles/ThemeApp'

export default function ManagePanel({ application }) {
  const { isLightMode } = useThemeContext()
  const isMobileSmall = useIsMobileSmall()
  const [value, setValue] = useState('Job Info')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabStyles = {
    minWidth: '42px',
    width: 'auto',
    minHeight: 40,
    height: 'auto',
    color: !isLightMode ? 'text.primary' : 'text.secondary',
    '&.Mui-selected': {
      color: !isLightMode ? 'accent.main' : 'inherit',
    },
    '&:hover': {
      color: !isLightMode ? 'accent.main' : 'inherit',
      opacity: 0.8,
    },
  }

  const tabs = [
    {
      label: 'Job Info',
      value: 'Job Info',
      icon: <PreviewIcon />,
      component: (application) => <JobInfo application={application} />,
    },
    {
      label: 'Notes',
      value: 'Notes',
      icon: <NotesIcon />,
      component: (application) => <Notes application={application} />,
    },
    {
      label: 'Interview',
      value: 'Interview',
      icon: <PeopleIcon />,
      component: (application) => <Interview application={application} />,
    },
    {
      label: 'Documents',
      value: 'Documents',
      icon: <InsertDriveFileIcon />,
      component: (application) => <Documents application={application} />,
    },
    {
      label: 'Contacts',
      value: 'Contacts',
      icon: <PermContactCalendarIcon />,
      component: (application) => <Contacts application={application} />,
    },
  ]

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: !isLightMode ? 'accent.main' : '',
              },
            }}
          >
            {tabs.map((item) => (
              <Tab
                key={item.value}
                label={isMobileSmall ? '' : item.label}
                value={item.value}
                icon={item.icon}
                iconPosition="start"
                sx={tabStyles}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((item) => (
          <TabPanel
            key={item.value}
            value={item.value}
            sx={{ padding: 0, paddingTop: 2 }}
          >
            {item.component(application)}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
