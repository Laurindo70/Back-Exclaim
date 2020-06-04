exports.up = function(knex) {
    return knex.schema.createTable('Revisao', function(table){
        table.increments('id').primary();
        table.integer('preco').notNullable();
        table.date('data').notNullable();
        table.integer('veiculo_id').notNullable();

        table.foreign('veiculo_id').references('id').inTable('Veiculos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Revisao');
};
