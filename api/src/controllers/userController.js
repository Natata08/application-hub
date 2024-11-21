import knex from '../database_client.js'
import { getOrCreateCompanyId } from '../utils/getOrCreateCompanyId.js'
import { updateField } from '../utils/updateField.js'

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

export const patchUserApplicationAndCompany = async (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid application ID' })
  }
  const {
    job_title,
    status,
    job_description,
    job_link,
    salary,
    applied_date,
    deadline_date,
    company_name,
    company_website,
    company_location,
  } = req.body

  try {
    const application = await knex('application')
      .where({
        application_id: id,
        user_id: req.userInfo.userId,
      })
      .first()

    if (!application) {
      return res.status(404).json({
        error:
          'Application not found or you do not have permission to update it',
      })
    }

    const applicationUpdateData = {}
    let companyUpdateData = {}

    updateField(applicationUpdateData, 'job_title', job_title)
    updateField(applicationUpdateData, 'status', status)
    updateField(applicationUpdateData, 'job_description', job_description)
    updateField(applicationUpdateData, 'job_link', job_link)
    updateField(applicationUpdateData, 'salary', salary, false, true)
    updateField(applicationUpdateData, 'applied_date', applied_date, true)
    updateField(applicationUpdateData, 'deadline_date', deadline_date, true)

    if (company_name !== undefined) {
      const company_id = await getOrCreateCompanyId(
        company_name,
        req.userInfo.userId
      )
      applicationUpdateData.company_id = company_id
      updateField(companyUpdateData, 'website', company_website)
      updateField(companyUpdateData, 'location', company_location)

      if (Object.keys(companyUpdateData).length > 0) {
        await knex('company').where({ company_id }).update(companyUpdateData)
      }
    }

    if (Object.keys(applicationUpdateData).length > 0) {
      await knex('application')
        .where({ application_id: id, user_id: req.userInfo.userId })
        .update(applicationUpdateData)
    }

    res.status(200).json({
      message: 'Application and Company updated successfully',
      updatedApplicationData: applicationUpdateData,
      updatedCompanyData: companyUpdateData,
    })
  } catch (error) {
    res.status(500).json({
      error: `Error updating data: ${error.message}`,
    })
  }
}
