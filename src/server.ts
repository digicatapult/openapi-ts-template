import express, { Express, NextFunction } from 'express'
import { setup, serve } from 'swagger-ui-express'

import cors from 'cors'
import { json } from 'body-parser'
import errorHandler from './lib/ErrorHandler'

import { RegisterRoutes } from './routes'
import * as swaggerJson from './swagger.json'
import Database from './database'
import log from './lib/Logger'


export default async (): Promise<Express> => {
  const db = new Database().init()
  console.log({ db })
  const app: Express = express()

  app.use((req: any, _, next: NextFunction) => log(req, next))
  // app.use(urlencoded({ extended: true })) - for application/x-www-form-urlencoded
  app.use(json())
  app.use(cors())
  app.use(() => errorHandler)

  RegisterRoutes(app)
  app.use(['/swagger'], serve, setup(swaggerJson))

  return app
}
