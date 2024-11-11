import { Tabs, Tab } from '@mui/material'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function TabsControl({ tabValue, onTabChange }) {
  return (
    <Tabs
      value={tabValue}
      onChange={onTabChange}
      variant="fullWidth"
      sx={{
        minWidth: 230,
        order: { xs: 2, md: 1 },
        '& .MuiTab-root': {
          textTransform: 'none',
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
          '&.Mui-selected': {
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          },
          '&:hover': {
            color: 'secondary.main',
            opacity: 0.8,
          },
        },
        '& .MuiTabs-indicator': {
          backgroundColor: 'secondary.main',
        },
      }}
    >
      <Tab label="In progress" {...a11yProps(0)} />
      <Tab label="Done" {...a11yProps(1)} />
    </Tabs>
  )
}
