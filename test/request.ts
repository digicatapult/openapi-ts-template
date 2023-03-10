// http request helpers
import request from 'supertest'

import Server from '../src/server'

// at the moment it creates a new instance everytime,
// converting into a class would eliminate as it would create
// one instance during the init along with headers and etc for different scenarios
export default {
  get: async (endpoint: string) =>
    request(await Server())
      .get(endpoint)
      .send(),

  post: async (endpoint: string, data: { [k: string]: string }) =>
    request(await Server())
      .post(endpoint)
      .send(data),
}
