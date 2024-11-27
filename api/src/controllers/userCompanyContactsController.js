import knex from '../database_client.js'
import { checkCompanyContactsExist } from '../utils/checkCompanyContactsExist.js'
import { getCompanyContactId } from '../utils/getCompanyContactId.js'
import { getCompanyId } from '../utils/getCompanyId.js'
import { updateField } from '../utils/updateField.js'

//get all contacts
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

//post contacts for the given application and company
export const postUserApplicationsCompanyContacts = async (req, res) => {
  const userId = req.userInfo.userId
  const id = parseInt(req.params.id)
  let companyId
  const companyContactsData = req.body

  if (!companyContactsData.name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  try {
    companyId = await getCompanyId(id, userId)
  } catch (error) {
    return res.status(500).json({
      error: 'Error on getting company ID' + error.message,
    })
  }

  try {
    await checkCompanyContactsExist(companyContactsData.name, companyId, id)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  try {
    // Insert the data for the new contact
    const [insertedCompanyContacts] = await knex('company_contact')
      .insert({
        company_id: companyId,
        application_id: id,
        name: companyContactsData.name,
        phone: companyContactsData.phone || null,
        email: companyContactsData.email || null,
        role: companyContactsData.role || null,
      })
      .returning('*')
    res.status(201).json({
      message: 'Company contact added successfully',
      company_contact: insertedCompanyContacts,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error on adding company contacts : ${error.message}` })
  }
}

// Update Company Contact
export const patchUserApplicationCompanyContact = async (req, res) => {
  const userId = req.userInfo.userId
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid application ID' })
  }

  const { name, phone, email, role } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  let updateData = {}
  let companyId
  let contactId

  try {
    companyId = await getCompanyId(id, userId)
    if (!companyId) {
      return res.status(404).json({
        error: 'Company not found',
      })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching company data' })
  }

  try {
    contactId = await getCompanyContactId(name, companyId, id)
    if (!contactId) {
      return res.status(404).json({ message: 'Contact not found' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error checking contact existence' })
  }

  try {
    updateField(updateData, 'name', name)
    updateField(updateData, 'phone', phone)
    updateField(updateData, 'email', email)
    updateField(updateData, 'role', role)
  } catch (validationError) {
    return res.status(400).json({ error: validationError.message })
  }

  try {
    if (Object.keys(updateData).length > 0) {
      await knex('company_contact')
        .where({
          'company_contact.contact_id': contactId,
          'company_contact.company_id': companyId,
          'company_contact.application_id': id,
        })
        .update(updateData)
    }

    res.status(200).json({
      message: 'Company contact updated successfully',
      updateData: updateData,
    })
  } catch (error) {
    res.status(500).json({
      error: `Error updating company data: ${error.message}`,
    })
  }
}
