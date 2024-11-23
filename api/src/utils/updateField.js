export const updateField = (
  data,
  key,
  value,
  isDate = false,
  isInt = false
) => {
  if (value !== undefined && value !== null) {
    const trimmedValue = value.trim()
    if (trimmedValue === '') {
      data[key] = null
    } else if (isInt) {
      const parsedValue = parseInt(trimmedValue)
      if (isNaN(parsedValue) || parsedValue < 0) {
        throw new Error(`${key} must be a non-negative integer`)
      }
      data[key] = parsedValue
    } else if (isDate) {
      if (isNaN(Date.parse(trimmedValue))) {
        throw new Error(`Invalid ${key} format. Must be a valid ISO 8601 date`)
      }
      data[key] = trimmedValue
    } else {
      data[key] = trimmedValue
    }
  }
}
