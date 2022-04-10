import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('caretaker_advertisement', (table) => {
    table.dropColumn('languages');
    table.integer('user_id').unsigned().references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('caretaker_advertisement', (table) => {
    table.string('languages').nullable();
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  });
}
