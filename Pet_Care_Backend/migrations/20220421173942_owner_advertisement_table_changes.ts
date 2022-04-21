import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('owner_advertisement', (table) => {
    table.date('startDate').notNullable();
    table.date('endDate').nullable();
    table.json('time_intervals');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('owner_advertisement', (table) => {
    table.dropColumn('startDate');
    table.dropColumn('endDate');
    table.dropColumn('time_intervals');
  });
}
