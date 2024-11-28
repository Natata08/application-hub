import express from 'express'
import knex from '../database_client.js'
import bcrypt from 'bcrypt'
import { generateAuthResponse } from '../utils/auth.js'
import { buildErrorDto } from '../dtos/errorDto.js'

const login = express.Router()

login.post('/', async (req, res) => {
  const { email, password } = req.body
  // Checking if we get the username and password
  if (!email || !password) {
    return res
      .status(400)
      .json(buildErrorDto('Email and password are required'))
  }
  try {
    const user = await knex('user').where({ email }).first()
    //Checking if user exist
    if (!user) {
      return res.status(401).json(buildErrorDto('Invalid email or password'))
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
      res.status(401).json(buildErrorDto('Invalid email or password'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error logging in', {
        cause: error.message,
      })
    )
  }
})

export default login
