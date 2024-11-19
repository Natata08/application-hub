export const makeLogoutApiCall = async () => {
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
  } catch (err) {
    console.error('Error during logout:', err)
  }
}
