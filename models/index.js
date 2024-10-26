import { Sequelize } from 'sequelize';
import User from './user.js'; 
import SecEmployee from './SecEmployee.js';
import Instructor from './Instructor.js';
import Textbook from './Textbook.js';
import Inventory from './Inventory.js';
import Course from './Course.js';
import Request from './Request.js';

const sequelize = new Sequelize('TMA', 'postgres', '12345', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

// Define relationships

// User has one SecEmployee
User.hasOne(SecEmployee, {
  foreignKey: 'userID',
  sourceKey: 'userID',
});

// SecEmployee belongs to User
SecEmployee.belongsTo(User, {
  foreignKey: 'userID',
  targetKey: 'userID',
});

// User has many Requests
User.hasMany(Request, {
  foreignKey: 'userID',
  sourceKey: 'userID',
});

// Request belongs to User
Request.belongsTo(User, {
  foreignKey: 'userID',
  targetKey: 'userID',
});

// User has many Instructors
User.hasMany(Instructor, {
  foreignKey: 'userID',
  sourceKey: 'userID',
});

// Instructor belongs to User
Instructor.belongsTo(User, {
  foreignKey: 'userID',
  targetKey: 'userID',
});

// Textbook has many Inventories
Textbook.hasMany(Inventory, {
  foreignKey: 'textbookID',
  sourceKey: 'textbookID',
});

// Inventory belongs to Textbook
Inventory.belongsTo(Textbook, {
  foreignKey: 'textbookID',
  targetKey: 'textbookID',
});

// Textbook has many Courses
Textbook.hasMany(Course, {
  foreignKey: 'textbookID',
  sourceKey: 'textbookID',
});

// Course belongs to Textbook
Course.belongsTo(Textbook, {
  foreignKey: 'textbookID',
  targetKey: 'textbookID',
});

// Instructor has many Courses
Instructor.hasMany(Course, {
  foreignKey: 'instructorID',
  sourceKey: 'instructorID',
});

// Course belongs to Instructor
Course.belongsTo(Instructor, {
  foreignKey: 'instructorID',
  targetKey: 'instructorID',
});

// Course has many Requests
Course.hasMany(Request, {
  foreignKey: 'courseID', 
  sourceKey: 'courseID',
});

// Request belongs to Course
Request.belongsTo(Course, {
  foreignKey: 'courseID', 
  targetKey: 'courseID',
});

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
