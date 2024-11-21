const API_URL = process.env.NEXT_PUBLIC_API_URL

export const makeLogoutApiCall = async (token) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Server response:', errorText)
    throw new Error(`Logout failed: ${errorText}`)
  }
  return await response.json()
}

export const makeRefreshTokenApiCall = async (token) => {
  const response = await fetch(`${API_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Token refresh failed: ${errorText}`)
  }

  return await response.json()
}
