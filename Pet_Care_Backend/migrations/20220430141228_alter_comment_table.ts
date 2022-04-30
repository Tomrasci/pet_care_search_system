import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('comment', (table) => {
    table.dropColumn('title');
    table.integer('user_id').unsigned().references('id').inTable('user');
    table
      .integer('advertisement_id')
      .unsigned()
      .references('id')
      .inTable('caretaker_advertisement');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('comment', (table) => {
    table.string('title');
    table.dropForeign('user_id');
    table.dropColumn('user_id');
    table.dropForeign('advertisement_id');
    table.dropColumn('advertisement_id');
  });
}
