// Update with your config settings.
//knex init to generate.
module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/firstdb'
  },
  test: {
    client: 'pg',
    connection:'postgres://localhost/test-firstdb'
  }
};
