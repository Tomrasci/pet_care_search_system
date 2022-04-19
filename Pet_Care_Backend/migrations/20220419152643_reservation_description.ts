import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservation', (table) => {
    table.string('description', 80);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservation', (table) => {
    table.dropColumn('description');
  });
}
