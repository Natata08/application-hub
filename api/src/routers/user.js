import express from 'express'

import {
  getUserProfile,
  getUserApplications,
  getUserApplicationsById,
  postUserApplications,
} from '../controllers/userController.js'
import verifyAuthToken from '../middleware/token_authentication.js'

const user = express.Router()

// The endpoints for getting user information in a safe way
user.get('/me', verifyAuthToken, getUserProfile)
user.get('/applications', verifyAuthToken, getUserApplications)
user.get('/applications/:id', verifyAuthToken, getUserApplicationsById)
user.post('/applications', verifyAuthToken, postUserApplications)

export default user
