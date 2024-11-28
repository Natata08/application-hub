export const buildErrorDto = (statusCode, message, details = {}) => ({
  status: 'error',
  message,
  details,
})
