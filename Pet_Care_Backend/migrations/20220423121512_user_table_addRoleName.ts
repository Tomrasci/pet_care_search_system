import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (table) => {
    table.integer('role').unsigned().references('id').inTable('role');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (table) => {
    table.dropForeign('role');
    table.dropColumn('role');
  });
}
