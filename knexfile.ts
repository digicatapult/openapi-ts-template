import type { Knex } from "knex";
  
import env from './src/env'


const config: { [key: string]: Knex.Config } = {
  default: {
    client: 'pg',
    migrations: {
      tableName: 'migrations',
      extension: "ts",
    },
    connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
  },
}

module.exports = config;
