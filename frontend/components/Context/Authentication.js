'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

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
        logout()
      }
    }
    checkAuth()
  }, [])

  const login = (user, token) => {
    if (!isTokenValid(token)) {
      throw new Error('Invalid token')
    }

    localStorage.setItem('authToken', token)
    localStorage.setItem('userInfo', JSON.stringify(user))
    setIsLoggedIn(true)
    setUserInfo(user)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
    setUserInfo(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
