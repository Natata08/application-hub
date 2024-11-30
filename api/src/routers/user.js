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
  getUserApplicationNote,
  postUserApplicationNote,
  deleteUserApplicationNote,
} from '../controllers/noteController.js'
import verifyAuthToken from '../middleware/tokenAuthentication.js'
import {
  deleteCompanyContact,
  getCompanyContacts,
  patchCompanyContact,
  postCompanyContact,
} from '../controllers/userCompanyContactsController.js'

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
user.get('/applications/:id/note', verifyAuthToken, getUserApplicationNote)
user.post('/applications/:id/note', verifyAuthToken, postUserApplicationNote)
user.delete(
  '/applications/:id/note',
  verifyAuthToken,
  deleteUserApplicationNote
)
user.get(
  '/applications/:id/company/contacts',
  verifyAuthToken,
  getCompanyContacts
)
user.post(
  '/applications/:id/company/contact',
  verifyAuthToken,
  postCompanyContact
)
user.patch(
  '/applications/:id/company/contact',
  verifyAuthToken,
  patchCompanyContact
)
user.delete(
  '/applications/:id/company/contact',
  verifyAuthToken,
  deleteCompanyContact
)
export default user
