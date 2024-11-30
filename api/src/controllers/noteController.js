import knex from '../database_client.js'
import { buildNoteDto } from '../dtos/noteDto.js'
import { sanitizeData } from '../utils/sanitizeData.js'
import { buildErrorDto } from '../dtos/errorDto.js'
import { checkApplicationExistByUserId } from '../utils/checkApplicationExist.js'

export const getUserApplicationNote = async (req, res) => {
  try {
    const user_id = req.userInfo.userId
    const application_id = parseInt(req.params.id)
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

      const note = await knex('application_note')
        .where('application_id', application_id)
        .first()

      if (!note) {
        return res.json(
          buildNoteDto({
            note_id: null,
            application_id: application_id,
            content: '',
            created_at: null,
            updated_at: null,
          })
        )
      }

      return res.json(buildNoteDto(note))
    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json(
        buildErrorDto('Database error', {
          cause: dbError.message,
        })
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json(
      buildErrorDto('Error fetching note', {
        cause: error.message,
      })
    )
  }
}

export const postUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }

    const { content } = req.body
    if (!content) {
      return res.status(400).json(buildErrorDto('Content is required'))
    }

    const sanitizedContent = sanitizeData(content)

    try {
      const [note] = await knex('application_note')
        .insert({
          application_id,
          content: sanitizedContent,
        })
        .onConflict('application_id')
        .merge({
          content: sanitizedContent,
        })
        .returning([
          'note_id',
          'application_id',
          'content',
          'created_at',
          'updated_at',
        ])

      return res.status(201).json(buildNoteDto(note))
    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json(
        buildErrorDto('Database error', {
          cause: dbError.message,
        })
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json(
      buildErrorDto('Error saving note', {
        cause: error.message,
      })
    )
  }
}

export const deleteUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }

    try {
      const deleted = await knex('application_note')
        .where('application_id', application_id)
        .delete()
        .returning(['note_id', 'application_id'])

      if (!deleted.length) {
        return res.status(404).json(buildErrorDto('Note not found'))
      }

      return res.status(200).json({ message: 'Note deleted successfully' })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json(
        buildErrorDto('Database error', {
          cause: dbError.message,
        })
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json(
      buildErrorDto('Error deleting note', {
        cause: error.message,
      })
    )
  }
}
