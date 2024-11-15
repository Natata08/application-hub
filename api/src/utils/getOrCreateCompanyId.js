import knex from '../database_client.js'

export const getOrCreateCompanyId = async (appData) => {
  let company_id
  const existingCompany = await knex('company')
    .where({ name: appData.company_name })
    .first()

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
