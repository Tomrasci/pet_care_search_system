import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("role", (table) => {
        table.increments("id");
        table.string("name", 40).notNullable();
    })
    .createTable("user", (table) => {
        table.increments("id");
        table.string("username", 255).notNullable();
        table.string("password", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("phone", 255).notNullable();
        table.string("address", 255).notNullable();
        table.string("photo_link", 255);
        table.timestamps(true, true);

    })
    .createTable("owner_advertisement", (table) => {
        table.increments("id");
        table.string("name", 255).notNullable();
        table.string("surname", 255).notNullable();
        table.string("phone", 255).notNullable();
        table.string("address", 255).notNullable();
        table.double("day_price").notNullable();
        table.string("description", 255);
        table.string("extra_information", 255);
        table.string("title", 50).notNullable();
        table.string("languages").notNullable();
        table.string("photo_link", 255);
        table.timestamps(true, true);
    })

    .createTable("caretaker_advertisement", (table) => {
        table.increments("id");
        table.string("name", 255).notNullable();
        table.string("surname", 255).notNullable();
        table.decimal("age").notNullable();
        table.string("phone", 255).notNullable();
        table.string("address", 255).notNullable();
        table.string("experience", 255).notNullable();
        table.string("activity", 255).notNullable();
        table.double("day_price").notNullable();
        table.string("description", 255);
        table.string("extra_information", 255);
        table.string("title", 50).notNullable();
        table.string("languages").notNullable();
        table.string("photo_link", 255);
        table.timestamps(true, true);
    })

    .createTable("review", (table) => {
        table.increments("id");
        table.string("title", 255).notNullable();
        table.string("description", 255).notNullable();
        table.timestamps(true, true);

    });
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("role")
    .dropTableIfExists("user")
    .dropTableIfExists("owner_advertisement")
    .dropTableIfExists("caretaker_advertisement")
    .dropTableIfExists("review");

}
