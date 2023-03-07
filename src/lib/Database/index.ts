import knex from 'knex'

import env from '../../env.js'

export const client = knex({
  client: 'pg',
  migrations: {
    tableName: 'migrations',
  },
  connection: {
   host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
})

// TODO read model directory and create CRUD for every during service start-up
// output = { model1, model2, model3 } with basic crud as belowish. filename = modelName
export default {
    getById: (id: string): Promise<any> => client('example-table').select('*').where('id', id),
    getAll: (): Promise<any> => client('example-table').select('*'),
    create: (data: any): Promise<any> => client('example-table').insert(data),
    delete: (id: string): Promise<any> => client('example-table').where('id', id),
}
