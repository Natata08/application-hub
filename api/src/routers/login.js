import express from 'express'
import knex from '../database_client.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// This router can be deleted once you add your own router
const login = express.Router()
const secretKey = process.env.JWT_SECRET

login.post('/', async (req, res) => {
  const { email, password } = req.body
  // Checking if we get the username and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  try {
    const user = await knex('user').where({ email }).first()
    //Checking if user exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Comparing hashed password from db with the provided password

    const isPasswordRight = await bcrypt.compare(password, user.password_hash)
    if (isPasswordRight) {
      const userInfo = {
        // What we have to send if password is right
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
      }

      // creating token for the user
      const token = jwt.sign({ userId: user.user_id }, secretKey, {
        expiresIn: '1h',
      })

      // Sending userInfo with token
      res.status(200).json({ userInfo: userInfo, token })
    } else {
      // Invalid password
      res.status(401).json({ message: 'Invalid password' })
    }
  } catch (error) {
    res.status(500).json({ error: `Error logging in: ${error.message}` })
  }
})

export default login
