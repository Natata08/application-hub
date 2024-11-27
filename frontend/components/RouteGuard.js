'use client'

import { useAuth } from './Context/Authentication'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Loader from './ui/Loader'

const publicPaths = ['/login', '/register']

export default function RouteGuard({ children }) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isPublicPath = publicPaths.includes(pathname)

  useEffect(() => {
    if (!isLoading && isLoggedIn && isPublicPath) {
      router.replace('/user')
    }
  }, [isLoggedIn, isLoading, isPublicPath, router])

  // Show loader while checking auth status or during redirect for logged-in users on public pages
  if (isLoading || (isLoggedIn && isPublicPath)) {
    return <Loader />
  }

  return children
}
