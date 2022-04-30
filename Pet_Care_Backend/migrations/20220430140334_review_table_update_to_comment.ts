import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.renameTable('review', 'comment');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable('comment', 'review');
}
