// Helper for string comparison
const compareStrings = (a, b) => {
  const valueA = a.toLowerCase()
  const valueB = b.toLowerCase()
  return valueA.localeCompare(valueB)
}

// Helper for date comparison
const compareDates = (a, b) => {
  const dateA = new Date(a)
  const dateB = new Date(b)
  return dateA - dateB
}

const sortingStrategies = {
  'Created Date': (a, b) => compareDates(a.created_at, b.created_at),
  'Last Updated': (a, b) => compareDates(a.updated_at, b.updated_at),
  'Job Title': (a, b) => compareStrings(a.job_title, b.job_title),
}

export const sortApplications = (applications, sortConfig) => {
  const { field, direction } = sortConfig
  const multiplier = direction === 'asc' ? 1 : -1
  const compareFunction = sortingStrategies[field]

  return [...applications].sort((a, b) => multiplier * compareFunction(a, b))
}
