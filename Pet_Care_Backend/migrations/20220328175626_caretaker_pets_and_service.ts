import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('pet_type', (table) => {
      table.increments('id');
      table.string('name', 40).notNullable();
    })
    .createTable('service_type', (table) => {
      table.increments('id');
      table.string('name', 40).notNullable();
    })
    .createTable('caretaker_pets', (table) => {
      table.increments('id');
      table.integer('caretaker_id').unsigned().references('id').inTable('user');
      table
        .integer('pet_type_id')
        .unsigned()
        .references('id')
        .inTable('pet_type');
    })
    .createTable('caretaker_services', (table) => {
      table.increments('id');
      table.integer('caretaker_id').unsigned().references('id').inTable('user');
      table
        .integer('service_type_id')
        .unsigned()
        .references('id')
        .inTable('service_type');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('caretaker_services')
    .dropTableIfExists('caretaker_pets')
    .dropTableIfExists('service_type')
    .dropTableIfExists('pet.type');
}
