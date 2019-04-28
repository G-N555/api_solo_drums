
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sticker', (table) =>{
      table.increments();
      table.string('title', 100);
      table.string('description', 100);
      table.float('rating');
      table.text('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('script');
};
