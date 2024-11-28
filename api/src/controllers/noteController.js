import knex from '../database_client.js'
import { buildNoteDto } from '../dtos/noteDto.js'

export const getUserApplicationNote = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    try {
      const note = await knex('application_note')
        .where('application_id', id)
        .first()

      if (!note) {
        return res.json(
          buildNoteDto({
            note_id: null,
            application_id: id,
            content: '',
            created_at: null,
            updated_at: null,
          })
        )
      }

      return res.json(buildNoteDto(note))
    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json({ error: 'Database error occurred' })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const postUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    const { content } = req.body
    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    try {
      const [note] = await knex('application_note')
        .insert({
          application_id,
          content,
        })
        .onConflict('application_id')
        .merge({
          content,
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
      return res.status(500).json({ error: 'Database error occurred' })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    if (!application_id || isNaN(application_id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    try {
      const deleted = await knex('application_note')
        .where('application_id', application_id)
        .delete()
        .returning(['note_id', 'application_id'])

      if (!deleted.length) {
        return res.status(404).json({ message: 'Note not found' })
      }

      return res.status(200).json({ message: 'Note deleted successfully' })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json({ error: 'Database error occurred' })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
