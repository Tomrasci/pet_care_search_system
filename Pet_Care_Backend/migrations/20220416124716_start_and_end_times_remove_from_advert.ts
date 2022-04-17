import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('caretaker_advertisement', (table) => {
    table.dropColumn('startTime');
    table.dropColumn('endTime');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('caretaker_advertisement', (table) => {
    table.time('startTime').notNullable();
    table.time('endTime').notNullable();
  });
}
