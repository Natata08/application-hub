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

  try {
    // Decode and verify the JWT
    const decoded = jwt.verify(token, SECRET_KEY)

    // Check if the token's JTI is invalidated
    const isInvalidated = await knex('invalidated_token')
      .where('jti', decoded.jti)
      .first()
      .then(Boolean)

    if (isInvalidated) {
      return res
        .status(401)
        .json(buildErrorDto('Token has been invalidated. Please login again'))
    }

    req.userInfo = decoded
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json(buildErrorDto('Token has expired'))
    }
    return res.status(401).json(
      buildErrorDto('Invalid token', {
        cause: err.message,
      })
    )
  }
}

export default verifyAuthToken
