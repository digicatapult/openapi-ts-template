import env from './env'
import { Express } from 'express'

import Server from './server'
import logger from './lib/logger/index'
;(async () => {
  const app: Express = await Server()

  app.listen(env.PORT, () => {
    logger.info(`openapi-ts-template listening on ${env.PORT} port`)
  })
})()
