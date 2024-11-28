import express from 'express'
import knex from '../database_client.js'
import bcrypt from 'bcrypt'
import { generateAuthResponse } from '../utils/auth.js'
import { buildErrorDto } from '../dtos/errorDto.js'

const register = express.Router()

// Registration
register.post('/', async (req, res) => {
  const { email, password, first_name, last_name } = req.body
  if (!email || !password || !first_name || !last_name) {
    console.error('Some fields from the frontend are invalid')
    return res.status(400).json(buildErrorDto('All fields are required'))
  }
  try {
    // Checking if the username already exists
    const existedUser = await knex('user').where({ email }).first()
    if (existedUser) {
      return res.status(400).json(buildErrorDto('Email already in use'))
    }
    // Hashing the password before save in dB
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const [user] = await knex('user')
      .insert({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password_hash: hashedPassword,
      })
      .returning(['user_id', 'first_name', 'last_name'])

    const authResponse = generateAuthResponse(user)
    res.status(201).json({
      message: 'Registration was successful',
      ...authResponse,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json(
      buildErrorDto('Error registering user', {
        cause: error.message,
      })
    )
  }
})

export default register
