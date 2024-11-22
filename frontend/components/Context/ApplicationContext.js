'use client'
import { createContext, useContext, useEffect, useState, useMemo } from 'react'
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

  const contextValue = useMemo(
    () => ({
      application: updatedApplication,
      isLoading,
      error,
      updateApplication,
    }),
    [updatedApplication, isLoading, error]
  )

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  )
}
