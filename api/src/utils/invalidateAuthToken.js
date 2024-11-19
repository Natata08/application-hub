import knex from '../database_client.js'
import jwt from 'jsonwebtoken'

export const invalidateAuthToken = async (token) => {
  const decoded = jwt.decode(token)

  if (!decoded || !decoded.jti) {
    throw new Error('Invalid token')
  }

  const jti = decoded.jti // Extract the JTI (JWT ID)
  const expiryTime = decoded.exp * 1000

  await knex('invalidated_token').insert({
    jti,
    expiry_time: expiryTime,
  })
}
