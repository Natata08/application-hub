'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useThemeContext } from '@/components/styles/ThemeApp'

const menuItemStyles = {
  minHeight: '30px',
  height: 'auto',
  fontSize: '0.85rem',
  overflow: 'hidden',
  '&:focus': {
    color: 'accent.main',
  },
}

const StatusPanel = ({ application }) => {
  const { isLightMode } = useThemeContext()
  const isMobile = useIsMobile()
  console.log(application.status)

  const storedStatus =
    typeof window !== 'undefined' ? localStorage.getItem('status') : null
  const [status, setStatus] = useState(storedStatus || 'Saved')

  const statuses = [
    'Saved',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
    'Withdraw',
  ]

  useEffect(() => {
    if (status) {
      localStorage.setItem('status', status)
    }
  }, [status])

  const handleStatusChange = (value) => {
    if (value) {
      setStatus(value)
    }
  }

  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl sx={{ display: isMobile ? 'block' : 'none' }}>
        <Select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          displayEmpty
          fullWidth
          sx={{
            bgcolor: isLightMode ? 'dashboard.main' : 'inherit',
            color: 'accent.main',
            fontSize: '0.85rem',
            fontWeight: 600,
            overflow: 'hidden',
            '& .MuiSelect-select': {
              textAlign: 'center',
              paddingY: '8px',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: '200px',
                overflowY: 'auto',
              },
            },
          }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s} sx={menuItemStyles}>
              {s.toLocaleUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={status}
        exclusive
        onChange={(e, value) => handleStatusChange(value)}
        fullWidth
        sx={{
          display: isMobile ? 'none' : 'flex',
        }}
      >
        {statuses.map((s) => (
          <ToggleButton
            key={s}
            value={s}
            sx={{
              fontSize: '0.85rem',
              '&.Mui-selected': {
                color: 'accent.main',
                fontWeight: 600,
              },
            }}
          >
            {s}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default StatusPanel
