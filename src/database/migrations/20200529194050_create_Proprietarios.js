exports.up = function(knex) {
    return knex.schema.createTable('Proprietario', function(table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('sexo').notNullable();
        table.string('idade', 3).notNullable();
        table.string('cpf', 11).notNullable();
        table.string('email').notNullable();
        table.string('numero', 15).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Proprietario');
};
