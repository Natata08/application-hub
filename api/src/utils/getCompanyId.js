import knex from '../database_client.js'

export const getCompanyId = async (applicationId, userId) => {
  try {
    const existingCompany = await knex('company')
      .join('application', 'company.company_id', 'application.company_id')
      .where({
        'application.application_id': applicationId,
        'company.user_id': userId,
      })
      .first()

    if (existingCompany && existingCompany.user_id === userId) {
      return existingCompany.company_id
    } else {
      throw new Error('Company not found for the given application and user.')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error while fetching company: ' + error.message)
  }
}
