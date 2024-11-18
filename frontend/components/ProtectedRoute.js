'use client'
import { useEffect } from 'react'
import { useAuth } from './Context/Authentication'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, redirectToLogin } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      redirectToLogin()
    }
  }, [isLoggedIn, redirectToLogin])

  return isLoggedIn ? children : null
}
