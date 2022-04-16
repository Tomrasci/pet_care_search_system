import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('caretaker_availability', (table) => {
    table.increments('id');
    table.time('startTime').notNullable();
    table.time('endTime').notNullable();
    table.specificType('day_of_week', 'CHAR(3)').notNullable();
    table.boolean(`available`).notNullable();
    table
      .integer(`advertisement_id`)
      .unsigned()
      .references('id')
      .inTable('caretaker_advertisement');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('caretaker_availability');
}
