import pkg from 'pg';
const { Pool } = pkg; // Destructure Pool from the imported package

// Use the JSON import assertion for the config file
import config from './config.json' assert { type: 'json' };

// Use the development configuration from your config file
const { username, host, database, password } = config.development;

// Create a connection pool to PostgreSQL
const pool = new Pool({
  user: username,
  host: host,
  database: database,
  password: password,
  port: 5432,
});


// // Test the connection
// const testConnection = async () => {
//   try {
//     await pool.connect();
//     console.log('Connected to the PostgreSQL database successfully!');
//   } catch (err) {
//     console.error('Connection to PostgreSQL database failed:', err);
//   } finally {
//     await pool.end(); // Close the connection pool
//   }
// };

// testConnection();
// Export the pool to be used in the services
export default pool;
