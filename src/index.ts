import env from './env'
import { Express } from 'express'

import Server from './server'
import { logger } from './lib/Logger'

// why separation? e2e?
// index.ts and server.ts
(async () => {
  const app: Express = await Server()

  app.listen(env.PORT, () => {
    logger.info('it is alive')
  })
})()
