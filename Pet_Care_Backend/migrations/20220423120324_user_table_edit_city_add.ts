import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('user', (table) => {
      table.dropForeign('role');
      table.dropColumn('role');
      table.string('city');
    })
    .alterTable('caretaker_advertisement', (table) => {
      table.string('city');
    })
    .alterTable('owner_advertisement', (table) => {
      table.string('city');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropForeign('role');
      table.dropColumn('role');
      table.integer('role').unsigned().references('id').inTable('role');
      table.dropColumn('city');
    })
    .alterTable('caretaker_advertisement', (table) => {
      table.dropColumn('city');
    })
    .alterTable('owner_advertisement', (table) => {
      table.dropColumn('city');
    });
}
