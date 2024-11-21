import knex from '../database_client.js'
import { checkApplicationExist } from '../utils/checkApplicationExist.js'
import { getOrCreateCompanyId } from '../utils/getOrCreateCompanyId.js'

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
      .select([
        'application.*',
        'company.name as company_name',
        'company.website as company_website',
        'company.location as company_location',
      ])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where({
        'application.application_id': id,
        'application.user_id': req.userInfo.userId,
      })
      .first()
    if (!application) {
      return res.status(404).json({ message: "Application can't find" })
    }
    return res.json(application)
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error on getting application by ID : ${error.message}` })
  }
}

export const postUserApplications = async (req, res) => {
  try {
    const appData = req.body
    const user_id = req.userInfo.userId
    try {
      // If application exist throw error
      await checkApplicationExist(
        appData.company_name,
        appData.job_title,
        user_id
      )
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    let company_id
    try {
      company_id = await getOrCreateCompanyId(appData.company_name, user_id)
    } catch (error) {
      return res.status(500).json({
        error: 'Error on getting or creating company ID' + error.message,
      })
    }

    // Insert the data for the new application
    await knex('application').insert({
      user_id: user_id,
      job_title: appData.job_title,
      company_id: company_id,
      status: appData.status,
      job_description: appData.job_description || null,
      job_link: appData.job_link || null,
      applied_date: appData.applied_date || null,
      deadline_date: appData.deadline_date || null,
    })
    res.status(201).json({ message: 'Application added successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error on adding application : ${error.message}` })
  }
}
