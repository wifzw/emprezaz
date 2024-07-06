import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('cpf').notNullable();
    table.string('phone').nullable();
    table.string('birth_date').notNullable();
    table.string('avatar').nullable();
    table.string('email').unique().notNullable();
    table.boolean('status').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now()).index();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

