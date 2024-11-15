import Image from 'next/image'
import { useThemeContext } from '@/components/styles/ThemeApp'

export default function Logo({ width = 100, height = 100 }) {
  const { isLightMode } = useThemeContext()
  return (
    <>
      {isLightMode ? (
        <Image
          src="/fona.png"
          alt="Logo"
          width={width}
          height={height}
          priority
        />
      ) : (
        <Image
          src="/fona-orange.png"
          alt="Logo"
          width={width}
          height={height}
          priority
        />
      )}
    </>
  )
}
