import express from 'express'
import knex from '../database_client.js'
import bcrypt from 'bcrypt'
import { generateAuthResponse } from '../utils/auth.js'

const login = express.Router()

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
      // The data for send with token if the password is right
      const authResponse = generateAuthResponse(user)

      // Sending userInfo with token
      res.status(200).json(authResponse)
    } else {
      // Invalid password
      res.status(401).json({ message: 'Invalid password' })
    }
  } catch (error) {
    res.status(500).json({ error: `Error logging in: ${error.message}` })
    console.error(error)
  }
})

export default login
