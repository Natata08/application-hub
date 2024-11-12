// this is to handle server-side rendering correctly
export const getLocalStorageItem = (key) => {
  // Check if it is browser environment
  if (typeof window === 'undefined') return null

  try {
    const item = localStorage.getItem(key)
    // Attempt to parse the item as JSON, if it fails -> return as it is
    try {
      return JSON.parse(item)
    } catch {
      return item
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return null
  }
}
