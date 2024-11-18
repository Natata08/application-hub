export const ApplicationStatus = {
  SAVED: 'saved',
  APPLIED: 'applied',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
}

export const ACTIVE_STATUSES = [
  { name: ApplicationStatus.SAVED },
  { name: ApplicationStatus.APPLIED },
  { name: ApplicationStatus.INTERVIEW },
  { name: ApplicationStatus.OFFER },
]

export const INACTIVE_STATUSES = [
  { name: ApplicationStatus.REJECTED },
  { name: ApplicationStatus.WITHDRAWN },
]
