export const makeSignUpApiCall = async (userData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText || 'Unknown error' }
    }
    throw new Error(`Error ${response.status}: ${errorData.message}`)
  }
}
