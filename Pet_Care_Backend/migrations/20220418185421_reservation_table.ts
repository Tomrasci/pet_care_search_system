import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('reservation_status', (table) => {
      table.increments('id');
      table.string('name', 40).notNullable().unique();
    })
    .createTable(`reservation`, (table) => {
      table.increments('id');
      table.date('date');
      table.string('startTime');
      table.string('endTime');
      table.integer(`user_id`).unsigned().references('id').inTable('user');
      table
        .integer(`advertisement_id`)
        .unsigned()
        .references('id')
        .inTable('caretaker_advertisement');
      table.string(`status`).references('name').inTable('reservation_status');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('reservatiom')
    .dropTableIfExists('reservation_status');
}
