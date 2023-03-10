import pino, { Logger } from 'pino'

import env from '../../env'

const logger: Logger = pino(
  {
    name: 'openapi-ts-template',
    timestamp: true,
    level: env.LOG_LEVEL,
  },
  process.stdout
)

export default logger
