import env from './env'
import { Express } from 'express'

import Server from './server'
import * as Log from './lib/logger'
import { Logger } from 'pino'

(async () => {
  const app: Express = await Server()
  const log: Logger = Log.add({ controller: 'server.ts', env })

  app.listen(env.PORT, () => {
    log.info(`service listening on [${env.PORT}] port`)
  })
})()
