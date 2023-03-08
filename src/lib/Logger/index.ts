import pino, { Logger } from 'pino'

import env from '../../env'

/**
 * TODOs: 
 * - [ ] - convert into a class
 * - [ ] - method for adding a child (should return new instance 'child' of logger)
 * - [ ] - take some imit args before starting the service
 */
const logger: Logger = pino(
  {
    name: 'openapi-ts-template',
    timestamp: true,
    prettyPrint: true,
    level: env.LOG_LEVEL,
  },
  process.stdout,
)

export default logger
