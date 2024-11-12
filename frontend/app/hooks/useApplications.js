import { useState, useEffect } from 'react'
import { getLocalStorageItem } from '@/utils/localStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useApplications() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const authToken = getLocalStorageItem('authToken')

        if (!authToken) {
          throw new Error('Authentication token not found')
        }

        const response = await fetch(`${API_URL}/user/applications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }

        const data = await response.json()
        setApplications(data)
      } catch (err) {
        console.log(err.message)
        setError(
          "We're having trouble loading your applications. Please try again later."
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  return { applications, isLoading, error }
}
