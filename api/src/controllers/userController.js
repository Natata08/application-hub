import knex from '../database_client.js'

export const getUserProfile = async (req, res) => {
  try {
    const userData = await knex('user')
      .where({ user_id: req.userInfo.userId })
      .first()
    if (!userData) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ userData })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getUserApplications = async (req, res) => {
  try {
    const applications = await knex('application')
      .select(['application.*', 'company.name as company_name'])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where('application.user_id', req.userInfo.userId)
      .orderBy('application.created_at', 'desc')

    res.json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching applications' })
  }
}

export const getUserApplicationsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }
    const application = await knex('application')
      .where({ application_id: id })
      .first()
    if (!application) {
      return res.status(404).json({ message: "Application can't find" })
    }
    return res.json(application)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
