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

export const fetchApplications = async () => {
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
    // For unauthorized
    if (response.status === 401) {
      throw new Error('Session expired. Please login again.')
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (err) {
    throw new Error('Failed to fetch applications')
  }
}

export const fetchApplicationById = async (id) => {
  try {
    const authToken = getLocalStorageItem('authToken')

    if (!authToken) {
      throw new Error('Authentication token not found')
    }

    const response = await fetch(`${API_URL}/user/applications/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    // For unauthorized
    if (response.status === 401) {
      throw new Error('Session expired. Please login again.')
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`, response.status)
    }
    return await response.json()
  } catch (err) {
    throw new Error('Failed to fetch applications')
  }
}
