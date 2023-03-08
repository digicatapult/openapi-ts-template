import { NextFunction, Request } from 'express'
import pino, { Logger } from 'pino'

import env from '../../env'

type LogData = { [k: string]: string | number | Object | undefined } 

interface Req extends Request {
  log: Logger,
  path: string,
}

const logger: Logger = pino({
  name: 'openapi-ts-template',
  timestamp: true,
  prettyPrint: true,
  level: env.LOG_LEVEL,
})

export const create = (data: LogData): Logger => logger.child(data)

export default (req: Req, next: NextFunction) => {
  const req_id: string = 'some-uuid'

  if (!req.log) req.log = logger.child({
    path: req.path,
    req_id,
    timestamp : Date.now(),
  })


  return next(req)
}
