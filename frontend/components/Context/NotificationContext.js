'use client'
import { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const showNotification = (msg, severity = 'success') => {
    setMessage(msg)
    setSeverity(severity)
    setOpen(true)
  }

  const hideNotification = () => setOpen(false)

  return (
    <NotificationContext.Provider
      value={{ open, message, severity, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
