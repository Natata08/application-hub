'use client'
import DOMPurify from 'isomorphic-dompurify'

const RichText = ({ htmlContent }) => {
  const cleanHtml = DOMPurify.sanitize(htmlContent)
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}
export default RichText
