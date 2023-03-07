import pino, { Logger } from 'pino'
import config from 'config'

// TODO make a class with methods like
// add(opts) - should add childs to the logger
// wrap up info/error etc
// unit tests
// assign logger to req.log?
const logger: Logger = pino(
  {
    name: 'openapi-ts-template',
    timestamp: true,
    prettyPrint: true,
    level: config.get('log.level'),
  },
)

export default logger
