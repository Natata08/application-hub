import { getLocalStorageItem } from './localStorage'

const API_URL = process.env.NEXT_PUBLIC_UPSTREAM_API_URL

const buildAbsoluteUrl = (relativeUrl) => {
  if (relativeUrl.startsWith('http')) {
    return relativeUrl
  }
  return `${API_URL}${relativeUrl}`
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

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new Error(data.error || response.statusText || 'Request failed')
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

export const fetchQuote = async () => {
  return apiRequest({
    relativeUrl: 'https://api.api-ninjas.com/v1/quotes?category=success',
    isAuthenticated: false,
    customHeaders: {
      'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
    },
  })
}

export const fetchStatuses = async () =>
  apiRequest({
    relativeUrl: '/publicApi/application/status',
    isAuthenticated: false,
  })

export const fetchApplications = async () =>
  apiRequest({
    relativeUrl: '/user/applications',
  })

export const fetchApplicationById = async (id) =>
  apiRequest({
    relativeUrl: `/user/applications/${id}`,
  })

export const addApplication = async (appData) =>
  apiRequest({
    relativeUrl: '/user/applications',
    method: 'POST',
    data: appData,
  })

export const patchApplication = async ({ id, updatedData }) =>
  apiRequest({
    relativeUrl: `/user/applications/${id}`,
    method: 'PATCH',
    data: updatedData,
  })

export const patchCompany = async ({ id, updatedData }) =>
  apiRequest({
    relativeUrl: `/user/applications/${id}/company`,
    method: 'PATCH',
    data: updatedData,
  })

export const deleteApplication = async (id) =>
  apiRequest({
    relativeUrl: `/user/applications/${id}`,
    method: 'DELETE',
  })
