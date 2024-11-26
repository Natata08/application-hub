import knex from '../database_client.js'
import { getOrCreateCompanyId } from '../utils/getOrCreateCompanyId.js'
import { checkCompanyContactsExist } from '../utils/checkCompanyContactsExist.js'

export const getUserApplicationsCompanyContacts = async (req, res) => {
  const user_id = req.userInfo.userId
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid application ID' })
  }

  try {
    const companyContacts = await knex('company_contact')
      .select(['company_contact.*'])
      .leftJoin('company', 'company_contact.company_id', 'company.company_id')
      .where({
        'company_contact.application_id': id,
        'company.user_id': user_id,
      })
      .orderBy('company_contact.created_at', 'desc')
    if (!companyContacts) {
      return res.status(404).json({ message: "Company contacts can't find" })
    }
    return res.json(companyContacts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching company contacts' })
  }
}

export const postUserApplicationsCompanyContacts = async (req, res) => {
  try {
    const companyContactsData = req.body
    const user_id = req.userInfo.userId
    try {
      // If application exist throw error
      await checkCompanyContactsExist(companyContactsData.name, user_id)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    let company_id
    try {
      company_id = await getOrCreateCompanyId(
        companyContactsData.company_name,
        user_id
      )
    } catch (error) {
      return res.status(500).json({
        error: 'Error on getting or creating company ID' + error.message,
      })
    }

    // Insert the data for the new application and return the application id

    const [insertedApplication] = await knex('application')
      .insert({
        user_id: user_id,
        job_title: companyContactsData.job_title,
        company_id: company_id,
        status: companyContactsData.status,
        job_description: companyContactsData.job_description || null,
        job_link: companyContactsData.job_link || null,
        applied_date: companyContactsData.applied_date || null,
        deadline_date: companyContactsData.deadline_date || null,
      })
      .returning('application_id')
    res.status(201).json({
      message: 'Application added successfully',
      application_id: insertedApplication.application_id,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error on adding application : ${error.message}` })
  }
}
