import { SORT_FIELDS, SORT_DIRECTIONS } from '@/constants/sort'
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
  [SORT_FIELDS.CREATED_DATE]: (a, b) =>
    compareDates(a.created_at, b.created_at),
  [SORT_FIELDS.LAST_UPDATED]: (a, b) =>
    compareDates(a.updated_at, b.updated_at),
  [SORT_FIELDS.JOB_TITLE]: (a, b) => compareStrings(a.job_title, b.job_title),
}

export const sortApplications = (applications, sortConfig) => {
  const { field, direction } = sortConfig
  const multiplier = direction === SORT_DIRECTIONS.ASC ? 1 : -1
  const compareFunction = sortingStrategies[field]

  return [...applications].sort((a, b) => multiplier * compareFunction(a, b))
}
