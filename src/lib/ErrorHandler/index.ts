import Ex from 'express'
import { ValidateError } from 'tsoa'

import log from '../../lib/Logger'

export interface Response {
  message: string 
  [name: string]: unknown
}

export class CustomError extends Error {
  readonly message: string
  readonly code: number

  constructor(message: string, code: number) {
    super(message)
    this.message = message 
    this.code = code || 500
  }
}

export default function(
  err: Error,
  req: Ex.Request,
  res: Ex.Response,
  next: Ex.NextFunction,
): Ex.Response | void {
  log.debug('error occured', { err, req })

  // handle TSOA validations
  if (err instanceof ValidateError) return res.status(422).send({
    ...err,
    details: err.fields
  })

  if (err instanceof CustomError) return res.status(err.code).send({
    ...err,
    message: err.message
  })

  return next()
}
