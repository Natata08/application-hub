'use client'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'

const styleCustomDrawer = (drawerOpen, drawerWidth, isMobile) => ({
  top: '4px',
  left: 0,
  width: drawerOpen
    ? isMobile
      ? `calc(${drawerWidth} - 120px)`
      : drawerWidth
    : isMobile
      ? '0px'
      : `calc(${drawerWidth} - 120px)`,
  height: '100%',
  transition: 'width 0.3s ease',
  overflow: drawerOpen ? 'none' : 'hidden',
  zIndex: 1201,
  marginRight: '10px',
  position: 'relative',
})

export default function CustomDrawer({
  drawerOpen,
  drawerWidth,
  menuItems,
  handleButtonClick,
}) {
  const isMobile = useIsMobile()

  return (
    <Box sx={styleCustomDrawer(drawerOpen, drawerWidth, isMobile)}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '2px',
                backgroundColor: 'secondary.main',
                transform: 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.3s ease',
              },
              '&:hover:after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            <ListItemButton onClick={() => handleButtonClick(item.name)}>
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                    color: 'primary.main',
                  },
                  drawerOpen
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                secondary={
                  <Typography
                    variant="body1"
                    sx={[
                      { color: 'primary.main' },
                      drawerOpen
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                      isMobile
                        ? {
                            display: 'none',
                          }
                        : {},
                    ]}
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
