import { Sequelize } from 'sequelize';
import config from './config.json' assert { type: 'json' };

// Use the development configuration from your config file
const { username, host, database, password } = config.development;

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

// Test the connection (optional)
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the PostgreSQL database successfully!');
  } catch (err) {
    console.error('Connection to PostgreSQL database failed:', err);
  }
};

testConnection();

// Export the Sequelize instance for use in your models
export default sequelize;
