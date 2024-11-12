// this is to handle server-side rendering correctly
export const getLocalStorageItem = (key) => {
  // check if we're in a browser environment
  if (typeof window === 'undefined') return null

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return null
  }
}
