import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Request = sequelize.define('Request', {
    requestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Adjust based on your requirements
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Adjust based on whether this is mandatory
        references: {
            model: 'User', // This should match the name of the User model
            key: 'userID',
        },
    },
    textbookID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Adjust based on whether this is mandatory
        references: {
            model: 'Textbook', // This should match the name of the Textbook model
            key: 'textbookID',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true, // Adjust as necessary
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true, // Adjust as necessary
    },
}, {
    tableName: 'requests',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default Request;
