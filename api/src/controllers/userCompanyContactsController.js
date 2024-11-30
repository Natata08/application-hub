import knex from '../database_client.js'
import { buildCompanyContactDto } from '../dtos/companyContactDto.js'
import { checkContactExists } from '../utils/checkContactExists.js'
import { getCompanyContactId } from '../utils/getCompanyContactId.js'
import { getCompanyId } from '../utils/getCompanyId.js'
import { updateField } from '../utils/updateField.js'
import { buildErrorDto } from '../dtos/errorDto.js'

//get all contacts
export const getCompanyContacts = async (req, res) => {
  const user_id = req.userInfo.userId
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
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
      return res.status(404).json(buildErrorDto('No company contacts found'))
    }
    return res.json(
      companyContacts.map((contact) => buildCompanyContactDto(contact))
    )
  } catch (error) {
    console.error(error)
    res.status(500).json(
      buildErrorDto('Error fetching contacts', {
        cause: error.message,
      })
    )
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
        .json(buildErrorDto('The specified company was not found.'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error on getting company ID', {
        cause: error.message,
      })
    )
  }

  try {
    await checkContactExists(contactData.name, companyId, id)
  } catch (error) {
    return res
      .status(400)
      .json(
        buildErrorDto(
          `Contact with the name ${contactData.name} already exists for this application.`
        )
      )
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
    res.status(201).json(buildCompanyContactDto(insertedContact))
  } catch (error) {
    res.status(500).json(
      buildErrorDto('Error creating contact', {
        cause: error.message,
      })
    )
  }
}

// Update Company Contact
export const patchCompanyContact = async (req, res) => {
  const userId = req.userInfo.userId
  const id = parseInt(req.params.id)

  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }

  const { currentName } = req.body
  if (!currentName) {
    return res
      .status(400)
      .json(
        buildErrorDto(
          'Contact name is required to locate the contact for updating.'
        )
      )
  }

  const { name, phone, email, role } = req.body
  let updateData = {}
  let companyId
  let contactId

  try {
    companyId = await getCompanyId(id, userId)
    if (!companyId) {
      return res.status(404).json(buildErrorDto('Company not found'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error on getting company ID', {
        cause: error.message,
      })
    )
  }

  try {
    contactId = await getCompanyContactId(currentName, companyId, id)
    if (!contactId) {
      return res
        .status(404)
        .json(
          buildErrorDto(
            'Contact with the specified name was not found for this application.'
          )
        )
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error on getting contact ID', {
        cause: error.message,
      })
    )
  }

  try {
    updateField(updateData, 'name', name)
    updateField(updateData, 'phone', phone)
    updateField(updateData, 'email', email)
    updateField(updateData, 'role', role)
  } catch (validationError) {
    return res.status(400).json(buildErrorDto(validationError.message))
  }

  try {
    if (Object.keys(updateData).length > 0) {
      const [updatedContact] = await knex('company_contact')
        .where({
          contact_id: contactId,
          company_id: companyId,
          application_id: id,
        })
        .update(updateData)
        .returning(['contact_id', 'name', 'role', 'email', 'phone'])

      if (!updatedContact || updatedContact.length === 0) {
        return res.status(404).json(buildErrorDto('Contact not found'))
      }

      res.status(200).json(buildCompanyContactDto(updatedContact))
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json(buildErrorDto('No valid fields provided for update.'))
    }
  } catch (error) {
    res.status(500).json(
      buildErrorDto('Error updating contact', {
        cause: error.message,
      })
    )
  }
}

//delete contact
export const deleteCompanyContact = async (req, res) => {
  const userId = req.userInfo.userId
  const id = parseInt(req.params.id)
  const { currentName } = req.body
  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }

  if (!currentName) {
    return res
      .status(400)
      .json(
        buildErrorDto(
          'Contact name is required to locate the contact for updating.'
        )
      )
  }

  let companyId

  try {
    companyId = await getCompanyId(id, userId)
    if (!companyId) {
      return res
        .status(404)
        .json(buildErrorDto('The specified company was not found.'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error on getting company ID', {
        cause: error.message,
      })
    )
  }

  try {
    const rowsDeleted = await knex('company_contact')
      .where({
        name: currentName,
        company_id: companyId,
      })
      .del()

    if (rowsDeleted) {
      return res.json({ message: 'Contact was deleted' })
    } else {
      return res
        .status(404)
        .json(
          buildErrorDto(
            `No contact with the name "${currentName}" was found for this company.`
          )
        )
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(
      buildErrorDto(`An error occurred while deleting the contact`, {
        cause: error.message,
      })
    )
  }
}
