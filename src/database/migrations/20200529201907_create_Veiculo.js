exports.up = function(knex) {
    return knex.schema.createTable('Veiculos', function(table){
        table.increments('id').primary();
        table.string('nome_carro').notNullable();
        table.string('marca').notNullable();
        table.integer('ano_fabricacao', 4).notNullable();
        table.string('placa').notNullable();


        table.string('id_dono').notNullable();

        table.foreign('id_dono').references('id').inTable('Proprietario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Veiculos');
};
