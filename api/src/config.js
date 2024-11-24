import envalid from 'envalid'

const env = envalid.cleanEnv(process.env, {
  PORT: envalid.port(),
  DB_CLIENT: envalid.str(),
  DB_HOST: envalid.host(),
  DB_PORT: envalid.port(),
  DB_USER: envalid.str(),
  DB_PASSWORD: envalid.str(),
  DB_DATABASE_NAME: envalid.str(),
  DB_USE_SSL: envalid.bool(),
  DATABASE_URL: envalid.url(),
  JWT_SECRET: envalid.str(),
  JWT_EXPIRY_IN_SECONDS: envalid.num({ default: 3600, min: 60 }),
})

export default {
  ...env,
  JWT_EXPIRY_WITH_UNIT: `${env.JWT_EXPIRY_IN_SECONDS}s`,
}
