import knex, { Knex } from 'knex'
import fs from 'fs' 
import path from 'path'

import type { Logger } from 'pino'
import * as log from '../logger' 
import { pgConfig } from './knexfile'

const MODELS_DIRECTORY = `${process.cwd()}/src/models`

/** Creates a connection to the postgres instance
 * usage: var db = new Database().init()
 * db.Example().where(id); db.Table.select(id); 
 */
export default class Database {
  public client: Knex
  private log: Logger 
  public db: any
  
  constructor() {
    this.log = log.add({ controller: 'database' }) 
    this.client = knex(pgConfig)
    this.db = {}
  }

  init(): void {
    this.log.debug('initializing db models')

    fs.readdirSync(MODELS_DIRECTORY).forEach((file: string) => {
      const { name } = path.parse(file)

      if(name != 'index.d') {
        console.log('not inde', name)
        this.db[name] = () => this.client(name)
      } else {
      }
    })

    const { index, ...rest } = this.db
    this.log.info(this.db, this.client, rest)

  } 
} 
