'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { logoutUser, refreshToken } from '@/utils/api'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const redirectToLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  // Checking if the token is not expired
  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken')
      const user = localStorage.getItem('userInfo')

      if (token && isTokenValid(token)) {
        setIsLoggedIn(true)
        try {
          setUserInfo(user ? JSON.parse(user) : null)
        } catch (error) {
          console.error('Error parsing userInfo:', error)
          setUserInfo(null)
        }
      } else {
        // Clear invalid or expired token
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
        setIsLoggedIn(false)
        setUserInfo(null)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = useCallback((user, token) => {
    if (!isTokenValid(token)) {
      throw new Error('Invalid token provided')
    }

    localStorage.setItem('authToken', token)
    localStorage.setItem('userInfo', JSON.stringify(user))
    setIsLoggedIn(true)
    setUserInfo(user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userInfo')
      setIsLoggedIn(false)
      setUserInfo(null)
      redirectToLogin()
    }
  }, [redirectToLogin])

  const refreshAuthToken = async () => {
    try {
      const data = await refreshToken()
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to refresh token:', error)
      return false
    }
  }

  const refreshTokenIfNeeded = useCallback(async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
      const payload = jwtDecode(token)
      const expiryInMinutes = (payload.exp * 1000 - Date.now()) / 1000 / 60

      if (expiryInMinutes <= 10) {
        const success = await refreshAuthToken()
        if (!success) {
          // If refresh failed, log out the user
          logout()
        }
      }
    } catch (error) {
      console.error('Token refresh check failed:', error)
      logout()
    }
  }, [logout])

  useEffect(() => {
    const intervalId = setInterval(refreshTokenIfNeeded, 60 * 1000) // Check every minute
    return () => clearInterval(intervalId)
  }, [refreshTokenIfNeeded])

  // Don't render children until initial auth check is complete
  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, login, logout, redirectToLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
