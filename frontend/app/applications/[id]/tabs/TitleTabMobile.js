import { Box, Divider, Typography } from '@mui/material'

const TitleTabMobile = ({ title }) => {
  return (
    <Box>
      <Typography
        component="h1"
        sx={{
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          paddingY: 1,
          paddingX: 2,
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {title}
      </Typography>
      <Divider />
    </Box>
  )
}

export default TitleTabMobile
