import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Textbook = sequelize.define('Textbook', {
    textbookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true, // Change to false if title is mandatory
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true, // Change to false if author is mandatory
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: true, // Change to false if ISBN is mandatory
    },
    edition: {
        type: DataTypes.INTEGER,
        allowNull: true, // Change to false if edition is mandatory
    },
    availabilityStatus: {
        type: DataTypes.STRING,
        allowNull: true, // Change to false if availability status is mandatory
    },
}, {
    tableName: 'textbooks',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default Textbook;
