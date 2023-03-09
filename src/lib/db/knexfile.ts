import type { Knex } from 'knex'
import env from '../../env'

export const pgConfig = {
  client: 'pg',
  timezone: 'UTC',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: 'src/lib/db/migrations',
    tableName: 'migrations',
  },
}

const config: { [key: string]: Knex.Config } = {
  test: pgConfig,
  development: pgConfig,
  production: {
    ...pgConfig,
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
  },
}

module.exports = config
