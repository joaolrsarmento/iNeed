
exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table){
        table.increments();
        
        table.string('clientUsername').notNullable();
        table.string('ownerUsername').notNullable();
        
        table.string('date').notNullable();
        table.decimal('value').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };
  