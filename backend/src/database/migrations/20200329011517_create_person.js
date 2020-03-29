
exports.up = function(knex) {
  return knex.schema.createTable('persons', function(table){
      table.string('username').primary().notNullable();
      table.string('password').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('house_number').notNullable();
      table.string('email').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('phone').notNullable();
      table.string('zip_code').notNullable();

      table.decimal('balance').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('persons');
};
