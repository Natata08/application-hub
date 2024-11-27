import knex from '../database_client.js'
import { buildCompanyContactDto } from '../dtos/companyContactDto.js'
import { checkContactExists } from '../utils/checkContactExists.js'
import { getCompanyId } from '../utils/getCompanyId.js'

//get all contacts
export const getCompanyContacts = async (req, res) => {
  const user_id = req.userInfo.userId
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ message: 'Application ID must be a valid number.' })
  }

  try {
    const companyContacts = await knex('company_contact')
      .select('company_contact.*')
      .leftJoin('company', 'company_contact.company_id', 'company.company_id')
      .where({
        'company_contact.application_id': id,
        'company.user_id': user_id,
      })
      .orderBy('company_contact.created_at', 'desc')
    if (!companyContacts) {
      return res.status(404).json({
        message: 'No company contacts found for the provided application.',
      })
    }
    return res.json(buildCompanyContactDto(companyContacts))
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'An unexpected error occurred while fetching company contacts.',
    })
  }
}

//post contact for the given application and company
export const postCompanyContact = async (req, res) => {
  const userId = req.userInfo.userId
  const id = parseInt(req.params.id)
  let companyId
  const contactData = req.body

  if (!contactData.name) {
    return res.status(404).json({ message: 'Contact name is required.' })
  }

  try {
    companyId = await getCompanyId(id, userId)
    if (!companyId) {
      return res
        .status(404)
        .json({ error: 'The specified company was not found.' })
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Error on getting company ID' + error.message,
    })
  }

  try {
    await checkContactExists(contactData.name, companyId, id)
  } catch (error) {
    return res.status(400).json({
      message: `Contact with the name "${contactData.name}" already exists for this application.`,
    })
  }

  try {
    // Insert the data for the new contact
    const [insertedContact] = await knex('company_contact')
      .insert({
        company_id: companyId,
        application_id: id,
        name: contactData.name,
        phone: contactData.phone || null,
        email: contactData.email || null,
        role: contactData.role || null,
      })
      .returning('*')
    res.status(201).json({
      message: 'Contact added successfully',
      company_contact: buildCompanyContactDto(insertedContact),
    })
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while adding the contact: ${error.message}`,
    })
  }
}
