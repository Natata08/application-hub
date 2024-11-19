import express from 'express'
import knex from '../database_client.js'
import jwt from 'jsonwebtoken'

const logout = express.Router()

logout.post('/', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(400).json({ message: 'No token provided' })
  }

  try {
    // Decode the token without verifying to extract the JTI
    const decoded = jwt.decode(token)

    if (!decoded || !decoded.jti) {
      return res.status(400).json({ message: 'Invalid token' })
    }

    const jti = decoded.jti // Extract the JTI (JWT ID)
    const expiryTime = decoded.exp * 1000 // Convert expiry time to milliseconds

    // Insert the JTI into the invalidated_tokens table
    await knex('invalidated_token').insert({
      jti,
      expiry_time: expiryTime,
    })

    // Cleanup expired tokens (non-blocking)
    knex('invalidated_token')
      .where('expiry_time', '<', Date.now())
      .del()
      .catch((error) => {
        console.error('Error cleaning up expired tokens:', error)
      })

    return res
      .status(200)
      .json({ message: 'Logged out successfully and token invalidated' })
  } catch (error) {
    console.error('Error invalidating token:', error)
    return res.status(500).json({ message: 'Failed to invalidate token' })
  }
})

export default logout
