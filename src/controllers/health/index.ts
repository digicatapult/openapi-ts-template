import { Controller, Get, Route, Request } from 'tsoa'

@Route('health')
export class health extends Controller {
  constructor() {
    super()
  }

  @Get('/')
  public async get(@Request() req: any): Promise<any> {
    // log.debug({ method: 'GET', controller: '/health'})

    return Promise.resolve({
        status: 200,
        message: 'success',
        req_id: req.req_id,
    })
  }
}
