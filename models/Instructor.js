import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.js'; // Adjust the path based on your folder structure

const Instructor = sequelize.define('Instructor', {
    instructorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference to the User model
            key: 'userID',
        },
    },
    department: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'instructors',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

// Establishing the relationship with User
Instructor.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user', // Alias for easier access
});

export default Instructor;
