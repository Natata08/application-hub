import express from 'express'
import jwt from 'jsonwebtoken'
import {
  getUserProfile,
  getUserApplications,
  getUserApplicationsById,
} from '../controllers/userController.js'

const user = express.Router()
// JWT's secret Key
const SECRET_KEY = process.env.JWT_SECRET

// Middleware to verify the token for restrict outside reach to the db
function authenticateToken(req, res, next) {
  const tokenAuth = req.header('Authorization')?.split(' ')[1]
  if (!tokenAuth) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(tokenAuth, SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    req.userInfo = userInfo
    next()
  })
}

// The endpoints for getting user information in a safe way
user.get('/me', authenticateToken, getUserProfile)
user.get('/applications', authenticateToken, getUserApplications)
user.get('/applications/:id', authenticateToken, getUserApplicationsById)

export default user
