import { Sequelize } from 'sequelize';
import User from './User.js';
import SecEmployee from './SecEmployee.js';
import Instructor from './Instructor.js';
import Textbook from './Textbook.js';
import Inventory from './Inventory.js';
import Course from './Course.js';
import Request from './Request.js';

// Initialize Sequelize
const sequelize = new Sequelize('TMA', 'postgres', '12345', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

// Initialize models
const models = {
  User: User.init(sequelize, Sequelize.DataTypes),
  SecEmployee: SecEmployee.init(sequelize, Sequelize.DataTypes),
  Course: Course.init(sequelize, Sequelize.DataTypes),
  Instructor: Instructor.init(sequelize, Sequelize.DataTypes),
  Textbook: Textbook.init(sequelize, Sequelize.DataTypes),
  Inventory: Inventory.init(sequelize, Sequelize.DataTypes),
  Request: Request.init(sequelize, Sequelize.DataTypes),
};

// Define relationships
User.associate(models);
SecEmployee.associate(models);
Course.associate(models);
Instructor.associate(models);
Textbook.associate(models);
Inventory.associate(models);
Request.associate(models);

// Sync all models
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Change to true to recreate tables
    console.log('Models synchronized successfully!');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

syncModels();

export { sequelize, User, SecEmployee, Instructor, Textbook, Inventory, Course, Request };
