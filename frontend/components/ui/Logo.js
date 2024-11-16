import Image from 'next/image'
import { useThemeContext } from '@/components/styles/ThemeApp'
import Link from 'next/link'

export default function Logo({ width = 100, height = 100 }) {
  const { isLightMode } = useThemeContext()
  return (
    <>
      {isLightMode ? (
        <Link href={'/'} passHref>
          <Image
            src="/fona.png"
            alt="Logo"
            width={width}
            height={height}
            priority
            sizes="(max-width: 600px) 60px, (max-width: 960px) 80px, 100px"
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      ) : (
        <Link href={'/'} passHref>
          <Image
            src="/fona-orange.png"
            alt="Logo"
            width={width}
            height={height}
            priority
            sizes="(max-width: 600px) 60px, (max-width: 960px) 80px, 100px"
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      )}
    </>
  )
}
