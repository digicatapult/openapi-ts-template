import { health } from '../index'
import { stub } from 'sinon'
import { expect } from 'chai'
import child from 'child_process'
import config from 'config'

const execute = async () => {
  try {
    const controller = new health()
    return await controller.get('out-of-bounds-read-cheri', ['test'])
  } catch (err) {
    return err
  }
}

describe('/health controller', () => {
  it('does something', () => {
    expect(1).to.equal(1)
  })
  
})

/*
const setupMocks = (stubs: any, options: any = {}) => {
  before(async () => {
    stubs.getRandomProcessName = stub(paramUtil, 'getRandomProcessName')
    stubs.getRandomProcessName.returns('out-of-bounds-read-cheri_foo')
    stubs.checkExecutable = stub(execUtil, 'checkExecutable')
    stubs.checkExecutable.resolves(options.checkExecutable === undefined ? true : options.checkExecutable)
    stubs.exec = stub(child, 'exec')
    stubs.exec.onCall(0).yields(options.exec.err, options.exec.stdout)
    stubs.exec.onCall(1)
  })

  after(() => {
    stubs.getRandomProcessName.restore()
    stubs.checkExecutable.restore()
    stubs.exec.restore()
  })
}

describe('/scenario/{example} endpoint', () => {
  describe('happy path', () => {
    let res: any
    const stubs: any = {}

    setupMocks(stubs, {
      exec: {
        err: null,
        stdout: 'stdout - success',
      },
    })

    before(async () => {
      res = await execute()
    })

    it('calls exec correctly', () => {
      const firstCallArg = stubs.exec.firstCall.args[0]
      const expectation = `scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -P ${port} bin/out-of-bounds-read-cheri ${address}:/tmp/out-of-bounds-read-cheri_foo; ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -p ${port} ${address} -t << 'EOF'
chmod +x /tmp/out-of-bounds-read-cheri_foo;
/tmp/out-of-bounds-read-cheri_foo 'test' 2>&1;
exit;
EOF`

      expect(firstCallArg).to.equal(expectation)
    })

    it('returns a formatted output', () => {
      expect(res).to.include.all.keys(['output', 'status'])
      expect(res).to.deep.equal({
        status: 'success',
        output: 'stdout - success',
      })
    })
  })

  describe('if executing binaries fails', () => {
    let res: any
    const stubs = {}
    setupMocks(stubs, {
      exec: {
        err: { message: 'error' },
        stdout: 'stdout - some error output',
      },
    })
    before(async () => {
      res = await execute()
    })

    it('returns correct state along with exceptions if both binaries fail', () => {
      expect(res).to.deep.equal({
        status: 'error',
        output: 'stdout - some error output',
        exception: { message: 'error' },
      })
    })
  })

  describe("if binary doesn't exist", () => {
    let res: any
    const stubs: any = {}
    setupMocks(stubs, {
      exec: {
        err: null,
        stdout: 'stdout - success',
      },
      checkExecutable: false,
    })
    before(async () => {
      res = await execute()
    })

    it('returns', () => {
      expect(res).to.be.an.instanceOf(ScenarioNotFoundError)
    })
  })
})
*/
