const { Pool } = require('pg');

// Create a connection pool to PostgreSQL
const pool = new Pool({
    user: 'fahad',
    host: 'localhost',
    database: 'TMA',
    password: '12345',
    port: 5432,
});

// Export the pool to be used in the services
module.exports = pool;
