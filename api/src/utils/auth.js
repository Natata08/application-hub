import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export const generateAuthResponse = (user) => {
  const secretKey = process.env.JWT_SECRET

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  const userInfo = {
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
  }

  const jti = uuidv4()

  const token = jwt.sign({ userId: user.user_id, jti: jti }, secretKey, {
    expiresIn: '1h',
  })

  return { userInfo, token }
}
