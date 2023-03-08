import { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('example', (t) => {
		t.increments('id').unsigned().primary()
		t.dateTime('createdAt').notNullable()
		t.dateTime('updatedAt').nullable()
		t.dateTime('deletedAt').nullable()
	})
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('example')
}
