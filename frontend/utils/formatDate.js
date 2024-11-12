export default function formatRelativeTime(date) {
  const now = new Date()
  const past = new Date(date)
  const diffTime = Math.abs(now - past)
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo ago`
  return `${Math.round(diffDays / 365)}y ago`
}
