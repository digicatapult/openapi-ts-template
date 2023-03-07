import { Controller, Get, Route, Request } from 'tsoa'
import { Health} from '../../types'

@Route('health')
export class health extends Controller implements Health {
  constructor() {
    super()
  }

  @Get('/')
  public async get(@Request() req: any): Promise<any> {
    const log = req.log

    log.debug({ method: 'GET', controller: '/health'})
    return Promise.resolve({
        status: 200,
        message: 'response from /health',
    })
  }
}
