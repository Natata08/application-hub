import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import knex from './database_client.js'

import register from './routers/register.js'
import login from './routers/login.js'
import user from './routers/user.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/register', register)
apiRouter.use('/login', login)
apiRouter.use('/user', user)

apiRouter.get('/', async (req, res) => {
  res.json('This is welcoming page of FONA Api')
})

// This code block is for check if database is connected
apiRouter.get('/check-db', async (req, res) => {
  try {
    await knex.raw('SELECT 1')
    res.status(200).json({ message: 'Database connection is successful' })
  } catch (error) {
    console.error('Database connection error:', error.message)
    res.status(500).json({
      message: 'Failed to connect to the database',
      error: error.message,
    })
  }
})
app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`)
})
