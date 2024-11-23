'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useApplicationById } from '@/app/hooks/useApplicationById'

const ApplicationContext = createContext(null)

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationProvider = ({ id, children }) => {
  const {
    application: initialApplicationData,
    isLoading,
    error,
  } = useApplicationById(id)
  const [application, setUpdatedApplication] = useState(null)

  useEffect(() => {
    setUpdatedApplication(initialApplicationData || null)
  }, [initialApplicationData])

  const updateApplication = (newData) => {
    setUpdatedApplication((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  return (
    <ApplicationContext.Provider
      value={{
        application,
        isLoading,
        error,
        updateApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
