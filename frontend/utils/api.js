import { getLocalStorageItem } from './localStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchQuote = async (setQuote, setIsLoading, setError) => {
  try {
    setIsLoading(true)
    setError(null)
    const response = await fetch(
      'https://api.api-ninjas.com/v1/quotes?category=success',
      {
        headers: {
          'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch quote')
    }

    const data = await response.json()
    setQuote(data[0])
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}

export const fetchApplications = async (
  setApplications,
  setIsLoading,
  setError
) => {
  try {
    const authToken = getLocalStorageItem('authToken')

    if (!authToken) {
      throw new Error('Authentication token not found')
    }

    setIsLoading(true)
    setError(null)
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
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
