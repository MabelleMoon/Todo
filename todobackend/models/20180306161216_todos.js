exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('todos', (table) => {
        table.increments('id').primary()
        table.string('value').notNullable()
        table.boolean('done').notNullable()
    })
 };
 
 exports.down = function(knex, Promise) {
   return knex.schema.dropTable('todos')
 };