import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservation', (table) => {
    table.dropColumn('startTime');
    table.dropColumn('endTime');
    table.string('time_intervals');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservation', (table) => {
    table.string('startTime');
    table.string('endTime');
    table.dropColumn('time_intervals');
  });
}
