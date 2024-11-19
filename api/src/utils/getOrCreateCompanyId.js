import knex from '../database_client.js'

export const getOrCreateCompanyId = async (companyName, user_id) => {
  try {
    let company_id
    const trimmedCompanyName = companyName.trim()

    // case-insensitive check for company name
    const existingCompany = await knex('company')
      .whereRaw('LOWER(name) = ?', trimmedCompanyName.toLowerCase())
      .first()

    // Checking if the company name exists and if it does, whether it belongs to the same user
    if (existingCompany && existingCompany.user_id === user_id) {
      company_id = existingCompany.company_id
      return company_id
    } else {
      // Insert the company and fetch the company ID immediately
      try {
        const [newCompany] = await knex('company')
          .insert({
            name: trimmedCompanyName,
            user_id: user_id,
          })
          .returning('company_id') // Get the inserted company's ID
        company_id = newCompany.company_id
        console.log(newCompany)
        return company_id
      } catch (error) {
        console.error('Error adding new company:', error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
