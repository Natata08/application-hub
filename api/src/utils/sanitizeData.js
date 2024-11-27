import DOMPurify from 'isomorphic-dompurify'

export const sanitizeData = (data) => {
  return DOMPurify.sanitize(data)
}
