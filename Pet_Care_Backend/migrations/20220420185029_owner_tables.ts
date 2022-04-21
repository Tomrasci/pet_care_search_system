import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('owner_advertisement', (table) => {
      table.dropColumn('languages');
      table.integer('user_id').unsigned().references('id').inTable('user');
    })
    .createTable('owner_pets', (table) => {
      table.increments('id');
      table
        .integer(`advertisement_id`)
        .unsigned()
        .references('id')
        .inTable('owner_advertisement');
      table
        .integer('pet_type_id')
        .unsigned()
        .references('id')
        .inTable('pet_type');
    })
    .createTable('owner_services', (table) => {
      table.increments('id');
      table
        .integer(`advertisement_id`)
        .unsigned()
        .references('id')
        .inTable('owner_advertisement');
      table
        .integer('service_type_id')
        .unsigned()
        .references('id')
        .inTable('service_type');
    })
    .createTable('owner_languages', (table) => {
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
        .inTable('owner_advertisement');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('owner_advertisement', (table) => {
      table.string('languages');
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    })
    .dropTableIfExists('owner_pets')
    .dropTableIfExists('owner_services')
    .dropTableIfExists('owner_languages');
}
