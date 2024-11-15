'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('userInfo')
    setIsLoggedIn(!!token)
    setUserInfo(user ? JSON.parse(user) : null)
  }, [])

  const login = (user, token) => {
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
