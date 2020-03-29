
exports.up = function(knex) {
  return knex.schema.createTable('itemsToGet', function(table){
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();

      table.decimal('valuePerDay').notNullable();
      table.integer('daysNeeded').notNullable();
      table.string('startDate').notNullable();
      table.boolean('shouldMailIt').notNullable();

      table.string('city').notNullable();
      table.string('uf', 2).notNullable();

      table.string('username').notNullable();
      table.foreign('username').references('username').inTable('persons');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('itemsToGet');
};
