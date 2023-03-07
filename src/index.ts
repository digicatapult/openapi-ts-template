import config from 'config'
import { Express } from 'express'

import Server from './server'
import log from './lib/Logger'

// why separation? e2e?
// index.ts and server.ts
(async () => {
  const app: Express = await Server()
  const port: number = config.get('app.port')

  app.listen(port, () => {
    log.info('it is alive')
  })
})()
