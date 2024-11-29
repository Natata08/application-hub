import knex from '../database_client.js'
import { buildInterviewsDto } from '../dtos/interviewsDto.js'
import { buildInterviewDto } from '../dtos/interviewsDto.js'
import { buildErrorDto } from '../dtos/errorDto.js'

export const getUserInterviews = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    try {
      const interviews = await knex('interview').where('application_id', id)
      if (!interviews || interviews.length === 0) {
        return res.status(204).json({ message: 'No interviews found' })
      }

      return res.json(buildInterviewsDto(interviews))
    } catch (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Database error' })
    }
  } catch (error) {
    console.error('Problem with id', error)
    return res.status(500).json(buildErrorDto('Internal server error'))
  }
}

export const postUserInterview = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    const { interviewDetails } = req.body
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    if (!interviewDetails) {
      return res.status(400).json(buildErrorDto('Interview details required'))
    }

    try {
      const [interview] = await knex('interview')
        .insert({
          application_id,
          type: interviewDetails.type,
          scheduled_at: interviewDetails.scheduled_at,
          location: interviewDetails.location,
          is_virtual: interviewDetails.is_virtual,
        })
        .returning([
          'interview_id',
          'application_id',
          'type',
          'scheduled_at',
          'location',
          'is_virtual',
          'created_at',
          'updated_at',
        ])

      return res.status(201).json(buildInterviewDto(interview))
    } catch (error) {
      console.error('Database error', error)
      return res.status(500).json(buildErrorDto('Database error'))
    }
  } catch (error) {
    console.error('Error with application ID or interview Details', error)
    return res.status(500).json(buildErrorDto('Internal error'))
  }
}
