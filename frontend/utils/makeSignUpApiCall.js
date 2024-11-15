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
      errorData = { message: 'Failed to parse error message' }
    }
    throw new Error(
      `Error ${response.status}: ${errorData.message || 'Unknown error'}`
    )
  }

  return await response.json()
}
