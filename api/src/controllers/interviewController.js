import knex from '../database_client.js'
import { buildInterviewsDto } from '../dtos/interviewsDto.js'
import { buildInterviewDto } from '../dtos/interviewsDto.js'
import { buildErrorDto } from '../dtos/errorDto.js'

export const getUserInterviews = async (req, res) => {
  try {
    const user_id = req.userInfo.userId
    const application_id = parseInt(req.params.id)
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    try {
      // User can only see its own interviews
      const interviews = await knex('interview')
        .join(
          'application',
          'interview.application_id',
          '=',
          'application.application_id'
        )
        .where('interview.application_id', application_id)
        .andWhere('application.user_id', user_id)

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
    const user_id = req.userInfo.userId
    const applicationId = parseInt(req.params.id)
    const { type, scheduled_at, location, is_virtual } = req.body
    if (!applicationId || isNaN(applicationId)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    if (!scheduled_at && !is_virtual) {
      return res.status(400).json(buildErrorDto('Interview details required'))
    }
    try {
      // Check if the application exists and the user_id matches
      const application = await knex('application')
        .where('application_id', applicationId)
        .select('user_id')
        .first()

      if (!application || application.user_id !== user_id) {
        return res
          .status(401)
          .json(
            buildErrorDto(
              'Unauthorized access: User does not own this application'
            )
          )
      }
      const [interview] = await knex('interview')
        .insert({
          application_id: applicationId,
          type,
          scheduled_at,
          location,
          is_virtual,
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

export const deleteUserInterview = async (req, res) => {
  const user_id = req.userInfo.userId
  const application_id = parseInt(req.params.id)
  const { interview_id } = req.body
  if (!application_id || isNaN(application_id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }
  try {
    const application = await knex('application')
      .where('application_id', application_id)
      .select('user_id')
      .first()

    if (!application) {
      return res.status(404).json(buildErrorDto('Application not found'))
    }

    if (application.user_id !== user_id) {
      return res
        .status(401)
        .json(
          buildErrorDto(
            'Unauthorized access: User does not own this application'
          )
        )
    }
    const interviewToDelete = await knex('interview')
      .where('application_id', application_id)
      .andWhere('interview_id', interview_id)
      .delete()
      .returning(['interview_id', 'application_id'])
    if (interviewToDelete.length === 0) {
      return res.status(404).json(buildErrorDto('Interview not found'))
    }
    return res.status(200).json({ message: 'Interview deleted successfully' })
  } catch (error) {
    console.error('Eror occured', error)
    return res.status(500).json(buildErrorDto('Internal server error'))
  }
}

export const patchUserInterview = async (req, res) => {
  const user_id = req.userInfo.userId
  const applicationId = parseInt(req.params.id)
  const { interview_id, type, scheduled_at, location, is_virtual } = req.body
  if (!applicationId || isNaN(applicationId)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }
  if (!type && !scheduled_at) {
    return res.status(400).json(buildErrorDto('Interview details required'))
  }
  try {
    const application = await knex('application')
      .where('application_id', applicationId)
      .select('user_id')
      .first()

    if (!application) {
      return res.status(404).json(buildErrorDto('Application not found'))
    }

    if (application.user_id !== user_id) {
      return res
        .status(401)
        .json(
          buildErrorDto(
            'Unauthorized access: User does not own this application'
          )
        )
    }
    const updatedRows = await knex('interview')
      .where('interview_id', interview_id)
      .update({
        type,
        scheduled_at,
        location,
        is_virtual,
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

    res.status(200).json(updatedRows)
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ message: 'internal error' })
  }
}
