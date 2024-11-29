export const buildInterviewDto = (interview) => ({
  interviewId: interview.interview_id,
  applicationId: interview.application_id,
  type: interview.type,
  scheduledAt: interview.schedule_at,
  isVirtual: interview.is_virtual,
  createdAt: interview.created_at,
  updatedAt: interview.updated_at,
})
