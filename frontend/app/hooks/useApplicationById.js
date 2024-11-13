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
