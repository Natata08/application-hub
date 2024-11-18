import jwt from 'jsonwebtoken'

export const generateAuthResponse = (user) => {
  const secretKey = process.env.JWT_SECRET

  const userInfo = {
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
  }

  const token = jwt.sign({ userId: user.user_id }, secretKey, {
    expiresIn: '1h',
  })

  return { userInfo, token }
}
