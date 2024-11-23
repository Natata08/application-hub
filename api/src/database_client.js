import knex from 'knex'
import config from './config.js'

const connection = knex({
  client: config.DB_CLIENT,
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE_NAME,
    ssl: config.DB_USE_SSL === true ? { rejectUnauthorized: false } : false,
  },
})

export default connection
