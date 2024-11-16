'use client'
import { useMediaQuery, useTheme } from '@mui/material'

export const useIsMobile = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}

export const useIsMobileSmall = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}
