import knex from '../database_client.js'
async function getOrCreateCompanyId(appData) {
  const existingCompany = await knex('company')
    .where({ name: appData.company_name })
    .first()
  let company_id
  if (existingCompany) {
    company_id = existingCompany.company_id
    return company_id
  } else {
    // Insert the company and fetch the company ID immediately
    const [newCompany] = await knex('company')
      .insert({
        name: appData.company_name,
      })
      .returning('company_id') // Get the inserted company's ID
    company_id = newCompany.company_id
    return company_id
  }
}
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
      .select(['application.*', 'company.*'])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where({ application_id: id, user_id: req.userInfo.userId })
      .first()
    if (!application) {
      return res.status(404).json({ message: "Application can't find" })
    }
    return res.json(application)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const postUserApplications = async (req, res) => {
  try {
    const { appData, user_id } = req.body
    const company_id = await getOrCreateCompanyId(appData)
    // Insert the data for the new application
    await knex('application').insert({
      user_id: user_id,
      job_title: appData.job_title,
      company_id: company_id,
      status: appData.status,
      job_description: appData.job_description,
      job_link: appData.job_link,
      applied_date: appData.applied_date,
      deadline_date: appData.deadline_date,
    })
    res.status(201).json({ message: 'Application added successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error on adding application : ${error.message}` })
  }
}

export const getApplicationStatuses = async (req, res) => {
  try {
    // Fetch distinct statuses
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
