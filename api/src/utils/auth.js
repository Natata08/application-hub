import jwt from 'jsonwebtoken'
import knex from '../database_client.js'
import { v4 as uuidv4 } from 'uuid'

const SECRET_KEY = process.env.JWT_SECRET

export const generateAuthResponse = (user) => {
  const expireTime = process.env.JWT_EXPIRY_IN_SECONDS

  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  const userInfo = {
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
  }

  const jti = uuidv4()

  const token = jwt.sign({ userId: user.user_id, jti: jti }, SECRET_KEY, {
    expiresIn: expireTime,
  })

  return { userInfo, token }
}

export const invalidateAuthToken = async (token) => {
  const decoded = jwt.decode(token)

  if (!decoded || !decoded.jti) {
    throw new Error('Invalid token')
  }

  const jti = decoded.jti // Extract the JTI (JWT ID)
  const expiryTime = decoded.exp

  await knex('invalidated_token').insert({
    jti,
    expiry_time: expiryTime,
  })
}

export const cleanupInvalidatedTokens = async () => {
  const currentTime = Math.floor(Date.now() / 1000)

  try {
    await knex('invalidated_token')
      .where('expiry_time', '<', currentTime)
      .delete()
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error)
  }
}
