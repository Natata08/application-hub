export const makeLogoutApiCall = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  try {
    const token = localStorage.getItem('authToken')

    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Server response:', errorText)
      throw new Error('Failed to log out')
    }
    return response
  } catch (err) {
    console.error('Error during logout:', err)
  }
}
