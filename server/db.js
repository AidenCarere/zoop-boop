// db.js
const { Pool } = require('pg');

// Replace these with your own database credentials
const localPgConnection = {
  user: 'aidencarere', // your PostgreSQL username
  host: 'localhost',
  database: 'words_and_users_database', // your local database name
//   password: 'yourPassword', // your PostgreSQL password, if you have one
  port: 5432, // your PostgreSQL port if different from the default
};

// Create a new pool
const pool = new Pool(localPgConnection);

// Export the query method for passing queries to the pool
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
