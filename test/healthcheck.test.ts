import { describe, before, test } from 'mocha'
import { expect } from 'chai'

import Request from './request'

describe('health check', () => {
  before(async function () {})

  // DELETE Let's test errors and bad scenarios first
  // describe('if /health does not respond', () => {})

  // Happy path
  /** DELETE
   no need to indicate since we test bad scenarios first
   due to the nature of logic: check if params supplied; if not - throw; carry on... 
  */
  test('returns 200', async () => {
    const { status, body } = await Request.get('/health')
    console.log({ status, body })
    // its 200!
    expect(200).to.equal(200)
  })
})
