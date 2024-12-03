import knex from '../database_client.js'
import config from '../config.js'
import jwt from 'jsonwebtoken'
import { buildErrorDto } from '../dtos/errorDto.js'

// JWT's secret Key
const SECRET_KEY = config.JWT_SECRET

// Middleware to verify the token for restrict outside reach to the db
const verifyAuthToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json(buildErrorDto('No token provided'))
  }

  let decoded

  try {
    decoded = jwt.verify(token, SECRET_KEY)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json(buildErrorDto('Token has expired'))
    }
    return res.status(400).json(buildErrorDto('Invalid token'))
  }

  try {
    const isInvalidated = await knex('invalidated_token')
      .where('jti', decoded.jti)
      .first()
      .then(Boolean)

    if (isInvalidated) {
      return res
        .status(401)
        .json(buildErrorDto('Token has been invalidated. Please login again'))
    }
  } catch (dbError) {
    console.error('Database error:', dbError)
    return res
      .status(500)
      .json(buildErrorDto('Authentication service temporarily unavailable'))
  }

  req.userInfo = decoded
  next()
}

export default verifyAuthToken
