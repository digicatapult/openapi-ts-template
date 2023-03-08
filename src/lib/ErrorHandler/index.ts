import Ex from 'express'
import { ValidateError } from 'tsoa'

export interface Response {
  message: string 
  [name: string]: unknown
}

/*    --- A REFERENCE --- 
export class CustomError extends Error {
  readonly message: string
  readonly code: number

  constructor(message: string, code: number) {
    super(message)
    this.message = message 
    this.code = code || 500
  }
}
*/

export default function(
  err: Error,
  req: Ex.Request & { log: any },
  res: Ex.Response,
  next: Ex.NextFunction,
): Ex.Response | void {
  req.log.debug('error occured', { err, req })

  // handle TSOA validations
  if (err instanceof ValidateError) return res.status(422).send({
    ...err,
    details: err.fields
  })

  return next()
}
