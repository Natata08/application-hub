import express from 'express'

import {
  getUserProfile,
  getUserApplications,
  getUserApplicationsById,
  postUserApplications,
} from '../controllers/userController.js'
import authenticateToken from '../middleware/token_authentication.js'

const user = express.Router()

// The endpoints for getting user information in a safe way
user.get('/me', authenticateToken, getUserProfile)
user.get('/applications', authenticateToken, getUserApplications)
user.get('/applications/:id', authenticateToken, getUserApplicationsById)
user.post('/applications', authenticateToken, postUserApplications)

export default user
