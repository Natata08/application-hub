import { useState, useEffect } from 'react'
import { fetchApplications } from '@/utils/api'

export function useApplications() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getApplications = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchApplications()
      setApplications(data)
    } catch (err) {
      setError(
        err.status === 401
          ? 'Please login to view your applications.'
          : "We're having trouble loading your applications. Please try again later."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getApplications()
  }, [])

  return { applications, isLoading, error }
}
