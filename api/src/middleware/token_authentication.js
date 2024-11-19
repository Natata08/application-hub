import knex from '../database_client.js'
import jwt from 'jsonwebtoken'

// JWT's secret Key
const SECRET_KEY = process.env.JWT_SECRET

// Middleware to verify the token for restrict outside reach to the db
const verifyAuthToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    // Decode and verify the JWT
    const decoded = jwt.verify(token, SECRET_KEY)

    // Optional: Check if the token's JTI is invalidated
    const result = await knex('invalidated_token')
      .select('jti')
      .where('jti', decoded.jti)
      .first()

    if (result) {
      return res
        .status(401)
        .json({ message: 'Token has been invalidated. Please login again.' })
    }

    req.userInfo = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default verifyAuthToken
