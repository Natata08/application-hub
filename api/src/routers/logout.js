import express from 'express'
import { cleanupInvalidatedTokens, invalidateAuthToken } from '../utils/auth.js'

const logout = express.Router()

logout.post('/', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
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
