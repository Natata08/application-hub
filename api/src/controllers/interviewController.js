import knex from '../database_client.js'
import { buildInterviewDto } from '../dtos/interviewDto.js'
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

      return res.json(buildInterviewDto(interviews))
    } catch (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Database error' })
    }
  } catch (error) {
    console.error('Problem with id', error)
    return res.status(500).json(buildErrorDto('Internal server error'))
  }
}
