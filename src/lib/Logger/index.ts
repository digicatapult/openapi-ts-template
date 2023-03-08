import pino, { Logger } from 'pino'

import env from '../../env'

export default pino({
  name: 'openapi-ts-template',
  timestamp: true,
  prettyPrint: true,
  level: env.LOG_LEVEL,
}) as Logger
