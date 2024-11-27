import knex from '../database_client.js'

export const getUserApplicationNotes = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    const notes = await knex('application_note')
      .where('application_id', id)
      .first()

    if (!notes) {
      return res.status(404).json({ message: "Notes can't find" })
    }
    return res.json(notes)
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error on getting notes : ${error.message}` })
  }
}

export const postUserApplicationNotes = async (req, res) => {
  try {
    const application_id = parseInt(req.params.id)
    const { content } = req.body

    if (!application_id || isNaN(application_id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }

    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    const [notes] = await knex('application_note')
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

    return res.status(201).json(notes)
  } catch (error) {
    // If error is about duplicate key, it means note already exists
    if (error.code === '23505') {
      // PostgreSQL unique violation code
      return res.status(409).json({
        error: 'Notes already exists for this application',
      })
    }

    return res
      .status(500)
      .json({ error: `Error creating application notes : ${error.message}` })
  }
}
