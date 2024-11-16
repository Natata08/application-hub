import { useState, useEffect } from 'react'
import { fetchApplications } from '@/utils/api'

export function useApplications() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getApplications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchApplications()
      setApplications(data)
    } catch (err) {
      setError(
        "We're having trouble loading your applications. Please try again later."
      )
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getApplications()
  }, [])

  return { applications, isLoading, error }
}
