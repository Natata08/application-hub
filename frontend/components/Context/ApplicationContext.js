'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useApplicationById } from '@/app/hooks/useApplicationById'

const ApplicationContext = createContext(null)

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationProvider = ({ id, children }) => {
  const { application, isLoading, error } = useApplicationById(id)
  const [updatedApplication, setUpdatedApplication] = useState(null)

  useEffect(() => {
    setUpdatedApplication(application || null)
  }, [application])

  const updateApplication = (newData) => {
    setUpdatedApplication((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  return (
    <ApplicationContext.Provider
      value={{
        application: updatedApplication,
        isLoading,
        error,
        updateApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
