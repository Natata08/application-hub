'use client'
import { Container } from '@mui/material'
import useIsMobile from '@/app/hooks/useIsMobile'

const ResponsiveWrapper = ({ children }) => {
  const isMobile = useIsMobile()

  return isMobile ? <>{children}</> : <Container>{children}</Container>
}

export default ResponsiveWrapper
