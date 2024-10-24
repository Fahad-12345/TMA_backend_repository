import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.js'; // Adjust the path based on your folder structure

const SecEmployee = sequelize.define('SecEmployee', {
    employeeID: {
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
    enrollmentYear: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'sec_employees',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

// Establishing the relationship with User
SecEmployee.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user', // Alias for easier access
});

export default SecEmployee;
