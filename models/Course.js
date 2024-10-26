import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Course = sequelize.define('Course', {
    courseID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false, // Adjust based on your requirements
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true, // Adjust as necessary
    },
    textbookID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Adjust based on whether this is mandatory
        references: {
            model: 'Textbook', // This should match the name of the Textbook model
            key: 'textbookID',
        },
    },
    instructorID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Adjust based on whether this is mandatory
        references: {
            model: 'Instructor', // This should match the name of the Instructor model
            key: 'instructorID',
        },
    },
}, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default Course;
