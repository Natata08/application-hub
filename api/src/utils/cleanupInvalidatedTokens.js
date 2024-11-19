import knex from '../database_client.js'

export const cleanupInvalidatedTokens = async () => {
  try {
    await knex('invalidated_token').where('expiry_time', '<', Date.now()).del()
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error)
  }
}
