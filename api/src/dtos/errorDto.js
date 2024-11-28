export const buildErrorDto = (message, details = {}) => ({
  status: 'error',
  message,
  details,
})
