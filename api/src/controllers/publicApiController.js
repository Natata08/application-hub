import knex from '../database_client.js'

export const getApplicationStatuses = async (req, res) => {
  try {
    // Fetch predefined values for status
    const rows = await knex('application').distinct('status')

    // Mapping the raw statuses to the format will be used in frontend
    const statuses = rows.map((row) => ({
      value: row.status,
      label: row.status.charAt(0).toUpperCase() + row.status.slice(1), // Capitalizing the first letter for the label
    }))

    // Returning the response with the statuses array
    res.json(statuses)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'An error occurred while fetching statuses' })
  }
}
