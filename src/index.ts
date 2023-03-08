import env from './env'
import { Express } from 'express'

import Server from './server'
import { create } from './lib/logger'
import { Logger } from 'pino'

(async () => {
  const app: Express = await Server()
  const log: Logger = create({ controller: 'server.ts' })

  app.listen(env.PORT, () => {
    log.info('it is alive')
  })
})()
