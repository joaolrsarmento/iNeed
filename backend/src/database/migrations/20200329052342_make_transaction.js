
exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table){
        table.increments();
        
        table.string('originUsername').notNullable();
        table.string('destinationUsername').notNullable();
        
        table.string('date').notNullable();
        table.decimal('value').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };
  