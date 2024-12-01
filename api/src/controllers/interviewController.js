import knex from '../database_client.js'
import { buildInterviewsDto } from '../dtos/interviewsDto.js'
import { buildInterviewDto } from '../dtos/interviewsDto.js'
import { buildErrorDto } from '../dtos/errorDto.js'
import { checkApplicationExistByUserId } from '../utils/checkApplicationExist.js'
import { updateField } from '../utils/updateField.js'

export const getUserInterviews = async (req, res) => {
  const user_id = req.userInfo.userId
  const application_id = parseInt(req.params.id)
  try {
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
  } catch (error) {
    console.error('Problem with ID or request data:', error)
    return res.status(500).json(buildErrorDto('Internal server error'))
  }

  try {
    const interviews = await knex('interview')
      .join(
        'application',
        'interview.application_id',
        '=',
        'application.application_id'
      )
      .where('interview.application_id', application_id)
      .andWhere('application.user_id', user_id)
    if (interviews.length === 0) {
      return res.status(200).json({
        message: 'No interviews found for the specified application and user ',
      })
    }

    return res.json(buildInterviewsDto(interviews))
  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json(buildErrorDto('Database error'))
  }
}

export const postUserInterview = async (req, res) => {
  try {
    const user_id = req.userInfo.userId
    const application_id = parseInt(req.params.id)
    const { type, scheduled_at, location, is_virtual } = req.body
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    if (!scheduled_at && !is_virtual) {
      return res.status(400).json(buildErrorDto('Interview details required'))
    }
    try {
      const isApplicationExist = await checkApplicationExistByUserId(
        application_id,
        user_id
      )
      if (!isApplicationExist) {
        return res
          .status(401)
          .json(buildErrorDto('Application not found with this user'))
      }

      const [interview] = await knex('interview')
        .insert({
          application_id,
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
    const isApplicationExist = await checkApplicationExistByUserId(
      application_id,
      user_id
    )
    if (!isApplicationExist) {
      return res
        .status(401)
        .json(buildErrorDto('Application not found with this user'))
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
  const application_id = parseInt(req.params.id)
  const { interview_id, type, scheduled_at, location, is_virtual } = req.body

  // Validate the application_id
  if (!application_id || isNaN(application_id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }

  // Validate interview details (either type or scheduled_at must be provided)
  if (!type && !scheduled_at) {
    return res.status(400).json(buildErrorDto('Interview details required'))
  }

  try {
    // Check if the application exists for the user
    const isApplicationExist = await checkApplicationExistByUserId(
      application_id,
      user_id
    )
    if (!isApplicationExist) {
      return res
        .status(401)
        .json(buildErrorDto('Application not found with this user'))
    }

    // Prepare the data object to be updated
    const dataToUpdate = {}

    // Use updateField to update each field in the dataToUpdate object
    if (type) {
      updateField(dataToUpdate, 'type', type) // Update 'type' field
    }
    if (scheduled_at) {
      updateField(dataToUpdate, 'scheduled_at', scheduled_at, true) // Update 'scheduled_at' field as a date
    }
    if (location) {
      updateField(dataToUpdate, 'location', location) // Update 'location' field
    }
    if (is_virtual !== undefined) {
      updateField(dataToUpdate, 'is_virtual', is_virtual) // Update 'is_virtual' field
    }

    // Update the interview in the database
    const updatedRows = await knex('interview')
      .where('interview_id', interview_id)
      .andWhere('application_id', application_id)
      .update(dataToUpdate)
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

    // Check if the update was successful
    if (updatedRows.length === 0) {
      return res
        .status(404)
        .json(buildErrorDto('Interview not found or update failed'))
    }

    res.status(200).json(updatedRows)
  } catch (error) {
    console.error('error', error)
    return res.status(500).json(buildErrorDto('Internal error'))
  }
}
