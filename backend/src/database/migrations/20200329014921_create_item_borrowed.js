
exports.up = function(knex) {
    return knex.schema.createTable('itemsToGive', function(table){
        table.increments();
  
        table.string('title').notNullable();
        table.string('description').notNullable();

        table.decimal('valuePerDay').notNullable();

        table.boolean('canMailIt').notNullable();
  
        table.string('username').notNullable();
        table.foreign('username').references('username').inTable('persons');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('itemsToGive');
  };
  