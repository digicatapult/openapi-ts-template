import express, { Express } from 'express'
import { setup, serve } from 'swagger-ui-express'

// middlewares
import cors from 'cors'
import { json } from 'body-parser'
import errorHandler from './lib/ErrorHandler'

import { RegisterRoutes } from './routes'
import * as swaggerJson from './swagger.json'
import Database from './database'
import log from './lib/Logger'


const db = new Database().init()

// server
export default async (): Promise<Express> => {
  const app: Express = express()

  // TODO abstract into a middleware for adding a child to pino logger instance
  app.use((req: any, _, next) => {
    const req_id: string = 'some-uuid'
    if (!req.log) req.log = log.child({
      path: req.path,
      req_id
    })

    log.info(db, ' asdasd ')

    return next(req)
  })

  // app.use(urlencoded({ extended: true })) - for application/x-www-form-urlencoded
  app.use(json())
  app.use(cors())
  app.use(errorHandler)

  RegisterRoutes(app)
  app.use(['/swagger'], serve, setup(swaggerJson))

  return app
}
