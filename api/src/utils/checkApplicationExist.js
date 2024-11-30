import knex from '../database_client.js'
export const checkApplicationExist = async (
  company_name,
  job_title,
  user_id
) => {
  const existingApplication = await knex('application')
    .join('company', 'application.company_id', 'company.company_id')
    .where({
      'company.name': company_name,
      'application.job_title': job_title,
      'application.user_id': user_id,
    })
    .first()

  if (existingApplication) {
    throw new Error(
      'Application for this company and job title already exists.'
    )
  }
}

export const checkApplicationExistByUserId = async (
  application_id,
  user_id
) => {
  const existingApplication = await knex('application')
    .where({
      application_id: application_id,
      user_id: user_id,
    })
    .first()
  return existingApplication
}
