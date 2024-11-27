import knex from '../database_client.js'

export const getUserApplicationNote = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    const note = await knex('application_note')
      .where('application_id', id)
      .first()

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    return res.json(note)
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error getting note: ${error.message}` })
  }
}

export const postUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    const { content } = req.body

    if (!application_id || isNaN(application_id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    const existingNote = await knex('application_note')
      .where('application_id', application_id)
      .first()

    let note
    if (existingNote) {
      ;[note] = await knex('application_note')
        .where('application_id', application_id)
        .update({
          content,
        })
        .returning([
          'note_id',
          'application_id',
          'content',
          'created_at',
          'updated_at',
        ])
    } else {
      ;[note] = await knex('application_note')
        .insert({
          application_id,
          content,
        })
        .returning([
          'note_id',
          'application_id',
          'content',
          'created_at',
          'updated_at',
        ])
    }

    return res.status(201).json(note)
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating/updating note: ${error.message}` })
  }
}

export const deleteUserApplicationNote = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)

    if (!application_id || isNaN(application_id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    const deleted = await knex('application_note')
      .where('application_id', application_id)
      .delete()
      .returning(['note_id', 'application_id'])

    if (!deleted.length) {
      return res.status(404).json({ message: 'Note not found' })
    }

    return res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error deleting note: ${error.message}` })
  }
}
