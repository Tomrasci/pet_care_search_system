import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('caretaker_pets', (table) => {
      //   table.dropForeign('caretaker_id');
      table.dropColumn('caretaker_id');
      table
        .integer('advertisement_id')
        .unsigned()
        .references('id')
        .inTable('caretaker_advertisement');
    })
    .alterTable('caretaker_services', (table) => {
      //   table.dropForeign('caretaker_id');
      table.dropColumn('caretaker_id');
      table
        .integer('advertisement_id')
        .unsigned()
        .references('id')
        .inTable('caretaker_advertisement');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('caretaker_pets', (table) => {
      table.dropForeign('advertisement_id');
      table.dropColumn('advertisement_id');
      table.integer('caretaker_id').unsigned().references('id').inTable('user');
    })
    .alterTable('caretaker_services', (table) => {
      table.dropForeign('advertisement_id');
      table.dropColumn('advertisement_id');
      table.integer('caretaker_id').unsigned().references('id').inTable('user');
    });
}
