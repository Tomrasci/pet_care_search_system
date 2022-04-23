import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (table) => {
    table.tinyint('advert_count').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (table) => {
    table.dropColumn('advert_count');
  });
}
