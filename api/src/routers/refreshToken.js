import express from 'express'
import jwt from 'jsonwebtoken'
import knex from '../database_client.js'
import { generateAuthResponse } from '../utils/auth.js'
import { invalidateAuthToken, cleanupInvalidatedTokens } from '../utils/auth.js'
import config from '../config.js'

const SECRET_KEY = config.JWT_SECRET

const refreshToken = express.Router()

refreshToken.post('/', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    // Get user info
    const user = await knex('user').where({ user_id: decoded.userId }).first()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Invalidate old token, clean up DB and generate new one
    await invalidateAuthToken(token)
    cleanupInvalidatedTokens()
    const authResponse = generateAuthResponse(user)
    res.status(200).json(authResponse)
  } catch (error) {
    console.error('Token refresh error:', error)
    return res.status(500).json({ message: 'Failed to refresh token' })
  }
})

export default refreshToken
