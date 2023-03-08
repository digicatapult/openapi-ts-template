import env from './env'
import { Express } from 'express'

import Server from './server'
import log from './lib/Logger'

// why separation? e2e?
// index.ts and server.ts
(async () => {
  const app: Express = await Server()

  app.listen(env.PORT, () => {
    log.info('it is alive')
  })
})()
