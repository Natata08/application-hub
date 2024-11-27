import { Parallax } from 'react-parallax'
import { useIsMobile } from '@/app/hooks/useIsMobile'

const HomePageParallax = () => {
  const isMobile = useIsMobile()
  const strength = isMobile ? 200 : 500
  return (
    <Parallax
      blur={0}
      bgImage="/parallaximg.jpeg"
      strength={strength}
      style={{ height: '300px', marginBottom: isMobile ? '50px' : '100px' }}
    >
      {' '}
      <div style={{ height: '500px' }} />
    </Parallax>
  )
}

export default HomePageParallax
