import { getLocalStorageItem } from './localStorage'

export const fetchWithAuth = async (url, options = {}) => {
  const authToken = getLocalStorageItem('authToken')

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.')
  }

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  if (!isTokenValid(authToken)) {
    localStorage.removeItem('authToken') // Clear expired token
    throw new Error('Authentication token expired. Please log in again.')
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  }

  const response = await fetch(url, { ...options, headers })

  if (response.status === 401) {
    throw new Error('Unauthorized. Please log in again.')
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Error ${response.status}`)
  }

  return await response.json()
}
