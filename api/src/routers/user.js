import express from 'express'

import {
  getUserProfile,
  getUserApplications,
  getUserApplicationsById,
  postUserApplications,
  patchUserApplication,
  patchUserApplicationCompany,
  deleteUserApplicationsById,
} from '../controllers/userController.js'
import {
  getUserApplicationNotes,
  postUserApplicationNotes,
} from '../controllers/notesController.js'
import verifyAuthToken from '../middleware/tokenAuthentication.js'

const user = express.Router()

// The endpoints for getting user information in a safe way
user.get('/me', verifyAuthToken, getUserProfile)
user.get('/applications', verifyAuthToken, getUserApplications)
user.get('/applications/:id', verifyAuthToken, getUserApplicationsById)
user.post('/applications', verifyAuthToken, postUserApplications)
user.patch('/applications/:id', verifyAuthToken, patchUserApplication)
user.patch(
  '/applications/:id/company',
  verifyAuthToken,
  patchUserApplicationCompany
)
user.delete('/applications/:id', verifyAuthToken, deleteUserApplicationsById)

user.get('/applications/:id/notes', verifyAuthToken, getUserApplicationNotes)
user.post('/applications/:id/notes', verifyAuthToken, postUserApplicationNotes)

export default user
