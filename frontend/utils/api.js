import { getLocalStorageItem } from './localStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const buildAbsoluteUrl = (relativeUrl) => {
  if (relativeUrl.startsWith('http://')) {
    return relativeUrl
  }

  return new URL(relativeUrl, API_URL)
}

const apiRequest = async ({
  relativeUrl,
  method = 'GET',
  data = null,
  isAuthenticated = true,
  customHeaders = {},
}) => {
  const url = buildAbsoluteUrl(relativeUrl)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  }

  if (isAuthenticated) {
    const authToken = getLocalStorageItem('authToken')
    if (!authToken) {
      throw new Error('Authentication token not found')
    }
    headers.Authorization = `Bearer ${authToken}`
  }

  const config = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  }

  try {
    const response = await fetch(url, config)

    switch (response.status) {
      case 401:
        throw new Error('Session expired. Please login again.')
      case 403:
        throw new Error('You do not have permission to perform this action.')
      case 404:
        throw new Error('Resource not found.')
    }

    if (response.ok) {
      return response.json()
    }

    const errorData = await response.json().catch(() => ({
      message: response.statusText || 'Unknown error occurred',
    }))

    throw new Error(errorData.message)
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

export const fetchQuote = async () => {
  try {
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

    return await response.json()
  } catch (err) {
    throw new Error(err.message)
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

export const addApplication = async (appData) => {
  const token = getLocalStorageItem('authToken')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/applications`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Sending token for verification
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    }
  )

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.json() || 'Unknown' }
    }
    throw new Error(`Error ${response.status}: ${errorData.message}`)
  }
  const result = await response.json()
  return result
}

export const fetchStatuses = async () => {
  try {
    const response = await fetch(`${API_URL}/publicApi/application/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('Failed to fetch statuses')
    }

    // Parse the response JSON and return it
    const statuses = await response.json()
    return statuses
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch statuses')
  }
}

export const patchApplication = async ({ id, updatedData }) => {
  const token = getLocalStorageItem('authToken')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/applications/${id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }
  )

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.json() || 'Unknown' }
    }
    throw new Error(`Error ${response.status}: ${errorData.message}`)
  }
}

export const patchCompany = async ({ id, updatedData }) => {
  const token = getLocalStorageItem('authToken')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/applications/${id}/company`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }
  )

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.json() || 'Unknown' }
    }
    throw new Error(`Error ${response.status}: ${errorData.message}`)
  }
}

export const deleteApplication = async (id) => {
  try {
    const authToken = getLocalStorageItem('authToken')

    if (!authToken) {
      throw new Error('Authentication token not found')
    }

    const response = await fetch(`${API_URL}/user/applications/${id}`, {
      method: 'DELETE',
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
    throw new Error(`Failed to delete application`)
  }
}
