import { useState, useEffect } from 'react'
import { fetchApplicationById } from '@/utils/api'

export function useApplicationById(id) {
  const [application, setApplication] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getApplicationsById = async (id) => {
    if (!id) {
      setError('No application ID provided')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchApplicationById(id)
      setApplication(data)
      console.log(data)
    } catch (err) {
      setError(
        err.status === 401
          ? 'Please login to view your application.'
          : `We're having trouble loading your application with ${id}. Please try again later.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getApplicationsById(id)
  }, [id])

  return { application, isLoading, error }
}
