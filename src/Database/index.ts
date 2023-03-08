import knex, { Knex } from 'knex'
import fs from 'fs' 
import path from 'path'

import { Logger } from 'pino'
import { log } from '../lib/Logger' 
import env from '../env'

interface Config {
  client: 'pg' 
  migrations: {
    tableName: 'migrations'
    directory: string 
    extension: 'ts' 
  },
  connection: {
    host: string 
    port: number
    user: string
    password: string
    database: string 
  },
}

const config: Config = {
  client: 'pg',
  migrations: {
    tableName: 'migrations',
    directory: '/migration',
    extension: "ts",
  },
  connection: {
   host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
}

/** Creates a connection to the postgres instance
 * usage: var db = new Database().init()
 * db.Example().where(id); db.Table.select(id); 
 */
export default class Database {
  private client: Knex
  private log: Logger & any 
  readonly dir: string
  [k: string]: keyof Database | Object

  constructor() {
    this.log = log
    this.client = knex(config)
    this.dir = `${__dirname}/models`
  }

  init(): void {
    this.log.debug('reading database models')

    fs.readdirSync(this.dir).forEach((file: string) => {
      const { name } = path.parse(file)
      this[name] = () => this.client(name)
    })

    this.log.debug({ models: this.db })
  } 
} 
