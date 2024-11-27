import knex from '../database_client.js'

export const checkCompanyContactsExist = async (
  name,
  companyId,
  applicationId
) => {
  const existingContact = await knex('company_contact')
    .join('company', 'company_contact.company_id', 'company.company_id')
    .where({
      'company_contact.name': name,
      'company.company_id': companyId,
      'company_contact.application_id': applicationId,
    })
    .first()

  if (existingContact) {
    throw new Error(
      'Contact with this name already exists for the given application'
    )
  }
}
