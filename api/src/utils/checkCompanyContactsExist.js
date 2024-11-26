import knex from '../database_client.js'
export const checkCompanyContactsExist = async (name, user_id) => {
  const existingCompanyContacts = await knex('company_contact')
    .join('company', 'company_contact.company_id', 'company.company_id')
    .where({
      'company_contact.name': name,
      'company.user_id': user_id,
    })
    .first()

  if (existingCompanyContacts) {
    throw new Error('Contact for this company already exists.')
  }
}
