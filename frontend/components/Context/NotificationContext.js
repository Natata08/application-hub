'use client'
import { createContext, useState, useContext, useCallback } from 'react'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const showNotification = useCallback((msg) => {
    setMessage(msg)
    setOpen(true)
  }, [])

  const hideNotification = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <NotificationContext.Provider
      value={{ open, message, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
