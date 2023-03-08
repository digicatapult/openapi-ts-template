import knex, { Knex } from 'knex'
import fs from 'fs' 

import { Logger } from 'pino'
import log from '../lib/Logger' 
import env from '../env'

const config = { // TODO define interface
  client: 'pg',
  migrations: {
    tableName: 'migrations',
  },
  connection: {
   host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
}

export default class Database {
  public db: {[key: string]: Knex & any }
  public client: Knex
  private log: Logger
  readonly dir: string

  constructor() {
    this.log = log.child({ config }) 
    this.dir = `${__dirname}/models`
    this.client = knex(config)
    this.db = {}
  }

  init(): void {
    this.log.debug('configure database models')

    fs.readdirSync(this.dir).forEach((file: string) => {
      const name = file.replace('.js', '')
      const _client = this.client(name)

      this.db[name] = {
        // raw: _client, 
        create: (data: any, pick: any) => _client.insert(data, pick),
        read: (select: any, where: any) => _client.select(select).where(where),
        delete: (where: any) => _client.delete(where)
        // update: this.client(name),
      }
    })
  } 
} 
