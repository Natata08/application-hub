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

  let decoded
  try {
    decoded = jwt.verify(token, SECRET_KEY)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token expired' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
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
    console.error('Database or token operation error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

export default refreshToken
