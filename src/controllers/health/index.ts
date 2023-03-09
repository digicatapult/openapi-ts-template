import { Controller, Get, Route, Request } from 'tsoa'

import * as Ex from 'express'
import type { Health } from '../../models'

@Route('health')
export class health extends Controller {
  constructor() {
    super()
  }

  @Get('/')
  public async get(@Request() req: Ex.Request & { req_id: string }): Promise<Health> {
    req.log.debug({ msg: 'new request received', controller: '/health' })

    return Promise.resolve({
      status: 200,
      message: 'success',
      req_id: req.req_id,
    })
  }
}
