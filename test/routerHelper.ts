import request from 'supertest'
import express from 'express'

export async function getHealth(
    app: express.Express,
  ) {
    return request(app)
      .get('/health')
      .send()
      .then((response) => {
        return response
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Out of bounds read (aaarch64) ${err}`)
        return err
      })
  }
  