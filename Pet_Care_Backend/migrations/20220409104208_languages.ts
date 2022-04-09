import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('language', (table) => {
      table.increments('id');
      table.string('name', 40).notNullable();
    })
    .createTable('caretaker_languages', (table) => {
      table.increments('id');
      table
        .integer('language_id')
        .unsigned()
        .references('id')
        .inTable('language');
      table
        .integer(`advertisement_id`)
        .unsigned()
        .references('id')
        .inTable('caretaker_advertisement');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('caretaker_languages')
    .dropTableIfExists('language');
}
