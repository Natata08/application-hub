export const isValidURL = (value) => {
  if (!value) {
    return true
  }
  try {
    new URL(value)
    return true
  } catch {
    return 'Please enter a valid link'
  }
}
