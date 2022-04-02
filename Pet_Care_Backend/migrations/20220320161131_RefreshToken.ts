import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('user', (table) => {
      table.integer('role').unsigned().references('id').inTable('role');
    })
    .createTable('refreshToken', (table) => {
      table.increments('id');
      table.string('token');
      table.datetime('expiryDate');
      table.integer('user_id').unsigned().references('id').inTable('user');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('refreshToken')
    .alterTable('user', (table) => {
      table.dropForeign('role.id', 'role');
    });
}
