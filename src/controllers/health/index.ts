import { Controller, Get, Query, Path, Route, Response } from 'tsoa'
import config from 'config'
import { exec } from 'child_process'
import { IScenario, HostResponse, Executables } from '../../types'
import Logger from '../../utils/Logger'
import * as paramUtil from '../../utils/params'
import * as execUtil from '../../utils/executables'
import { ValidateErrorJSON, ScenarioNotFoundJSON, ScenarioNotFoundError } from '../../utils/errors'

@Route('scenario')
export class health extends Controller implements IScenario {
  address: string
  port: number
  binaryDir: string
  log: typeof Logger

  constructor() {
    super()
    this.address = `${config.get('morello.username')}@${config.get('morello.host')}`
    this.port = config.get('morello.port')
    this.binaryDir = config.get('app.binaryDir')
    this.log = Logger.child({ controller: '/scenario', ...config.get('morello') })
  }

  async execute(bin: Executables, params: string[] = []): Promise<HostResponse> {
    if (!(await execUtil.checkExecutable(this.binaryDir, bin))) {
      throw new ScenarioNotFoundError(bin)
    }

    params = params.map((p) => paramUtil.escapeParam(p))
    const destBin = paramUtil.getRandomProcessName(bin)
    const eof = paramUtil.getValidHeredocEOF(bin, params)

    const scp = `scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -P ${this.port} ${this.binaryDir}/${bin} ${this.address}:/tmp/${destBin}`
    const ssh = `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -p ${this.port} ${
      this.address
    } -t << '${eof}'
chmod +x /tmp/${destBin};
/tmp/${destBin} ${params.join(' ')} 2>&1;
exit;
${eof}`

    const rm = `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -p ${this.port} ${this.address} rm -v /tmp/${destBin} &> /dev/null`
    this.log.debug({ msg: `executing ${bin} on ${this.address} host`, scp, ssh })

    return new Promise((resolve) => {
      exec(`${scp}; ${ssh}`, (stderr, stdout, err) => {
        exec(rm) // fire and forget, remove binary file
        return resolve(
          stderr
            ? {
                status: 'error',
                output: err || stdout,
                exception: stderr,
              }
            : {
                status: 'success',
                output: stdout,
              }
        )
      })
    })
  }

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Response<ScenarioNotFoundJSON>(501, 'Error executing scenario (not found)')
  @Get('{executable}')
  public async get(@Path() executable: Executables, @Query() params?: string[]): Promise<HostResponse> {
    this.log.debug(`attempting to execute ${executable} scenario with [${params}] arguments`)

    return this.execute(executable, params)
  }
}
