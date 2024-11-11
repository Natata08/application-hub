import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'

export default function SortControl({ onSortApply }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSort, setSelectedSort] = useState('Created Date')
  const [sortDirection, setSortDirection] = useState('asc')
  const open = Boolean(anchorEl)

  const sortOptions = ['Created Date', 'Last Updated', 'Job Title']

  const directionOptions = [
    { value: 'asc', label: 'Asc' },
    { value: 'desc', label: 'Desc' },
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSortSelect = (value) => {
    setSelectedSort(value)
  }

  const handleDirectionChange = (event) => {
    setSortDirection(event.target.value)
  }

  const handleApply = () => {
    onSortApply({ field: selectedSort, direction: sortDirection })
    handleClose()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Sort By
        </Typography>
        <Button
          id="sort-button"
          aria-controls={open ? 'sort-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            minWidth: 160,
            bgcolor: 'background.paper',
            color: 'text.primary',
            textTransform: 'none',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            px: 1.5,
            py: 0.75,
            '&:hover': {
              bgcolor: 'background.paper',
              borderColor: 'secondary.main',
            },
          }}
        >
          {selectedSort}
        </Button>
      </Box>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            width: 160,
            paddingTop: 2,
            paddingBottom: 0,
            borderRadius: 1,
            bgcolor: 'background.paper',
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSortSelect(option)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color:
                  selectedSort === option ? 'text.primary' : 'text.secondary',
                fontSize: 14,
              }}
            >
              {option}
            </Typography>
            {selectedSort === option && <CheckIcon />}
          </MenuItem>
        ))}

        <Divider sx={{ '&.MuiDivider-root': { marginBottom: 0 } }} />

        <Box sx={{ px: 2, py: 1 }}>
          <RadioGroup value={sortDirection} onChange={handleDirectionChange}>
            {directionOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color:
                        sortDirection === option.value
                          ? 'primary.main'
                          : 'text.secondary',
                    }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, py: 2 }}>
          <Button
            onClick={handleApply}
            variant="contained"
            sx={{
              textTransform: 'none',
            }}
          >
            Apply
          </Button>
        </Box>
      </Menu>
    </>
  )
}
