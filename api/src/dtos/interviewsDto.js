export const buildInterviewDto = (interview) => ({
  interviewId: interview.interview_id,
  applicationId: interview.application_id,
  type: interview.type,
  location: interview.location,
  scheduledAt: interview.scheduled_at,
  isVirtual: interview.is_virtual,
  createdAt: interview.created_at,
  updatedAt: interview.updated_at,
})

export const buildInterviewsDto = (interviews) =>
  interviews.map(buildInterviewDto)
