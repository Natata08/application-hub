import knex from '../database_client.js'
import { buildErrorDto } from '../dtos/errorDto.js'

export const getApplicationStatuses = async (req, res) => {
  try {
    // Get all possible values from application_status enum type as separate rows
    const { rows } = await knex.raw(`
      SELECT unnest(enum_range(NULL::application_status)) as status;
    `)

    // Mapping the raw statuses to the format that will be used in frontend
    const statuses = rows.map((row) => ({
      value: row.status,
      label: row.status.charAt(0).toUpperCase() + row.status.slice(1),
    }))

    // Returning the response with the statuses array
    res.json(statuses)
  } catch (error) {
    console.error(error)
    res.status(500).json(
      buildErrorDto('Error fetching statuses', {
        cause: error.message,
      })
    )
  }
}
