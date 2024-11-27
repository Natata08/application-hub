import Image from 'next/image'
import { useThemeContext } from '@/components/styles/ThemeApp'
import Link from 'next/link'

export default function Logo({ width = 100, height = 100 }) {
  const { isLightMode } = useThemeContext()
  return (
    <>
      <Link href={'/'} passHref>
        <Image
          src={isLightMode ? '/fona.png' : '/fona_darkMode.png'}
          alt="Logo"
          width={width}
          height={height}
          priority
          sizes="(max-width: 600px) 80px, (max-width: 960px) 80px, 100px"
          style={{ width: '100', height: 'auto' }}
        />
      </Link>
    </>
  )
}
