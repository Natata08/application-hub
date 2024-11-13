import { getLocalStorageItem } from '@/utils/localStorage'

export const addApplication = async (dataToSend) => {
  const token = getLocalStorageItem('authToken')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/applications`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Sending token for verification
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
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
