export const buildErrorDto = (statusCode, message, details = {}) => ({
  status: 'error',
  statusCode: statusCode,
  message: message,
  details: details,
})
