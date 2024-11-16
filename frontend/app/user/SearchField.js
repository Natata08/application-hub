import { InputBase, Box, CircularProgress, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export default function SearchField({ value, onChange, isSearching }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        '&:focus-within': {
          backgroundColor: 'action.hover',
          borderColor: 'secondary.main',
        },
      }}
    >
      <SearchIcon
        sx={{
          padding: '8px',
          color: 'text.secondary',
          fontSize: 35,
          opacity: 0.5,
        }}
      />
      <InputBase
        value={value}
        onChange={handleChange}
        placeholder="Search"
        sx={{
          maxWidth: 100,
          '& .MuiInputBase-input': {
            padding: '8px 0',
            fontSize: 14,
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 0.5,
            },
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          visibility: value ? 'visible' : 'hidden',
        }}
      >
        {isSearching ? (
          <CircularProgress size={20} color="primary.main" />
        ) : (
          <IconButton size="small" onClick={handleClear}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}
