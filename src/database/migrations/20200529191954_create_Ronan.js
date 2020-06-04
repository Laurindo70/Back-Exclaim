exports.up = function(knex) {
    return knex.schema.createTable('Ronan', function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sobrenome').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Ronan');
};
