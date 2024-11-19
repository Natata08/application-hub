import express from 'express'
import { cleanupInvalidatedTokens } from '../utils/cleanupInvalidatedTokens.js'
import { invalidateAuthToken } from '../utils/invalidateAuthToken.js'

const logout = express.Router()

logout.post('/', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(400).json({ message: 'No token provided' })
  }

  try {
    await invalidateAuthToken(token)

    cleanupInvalidatedTokens()

    return res
      .status(200)
      .json({ message: 'Logged out successfully and token invalidated' })
  } catch (error) {
    console.error('Error invalidating token:', error)
    return res.status(500).json({ message: 'Failed to invalidate token' })
  }
})

export default logout
