import express from 'express'
import { getApplicationStatuses } from '../controllers/publicApiController.js'

const publicApi = express.Router()

// The endpoints for getting user information in a safe way
publicApi.get('/application/status', getApplicationStatuses)

export default publicApi
