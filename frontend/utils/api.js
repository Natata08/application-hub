export const fetchQuote = async (setQuote, setIsLoading, setError) => {
  try {
    setIsLoading(true)
    setError(null)
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

    const data = await response.json()
    setQuote(data[0])
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
