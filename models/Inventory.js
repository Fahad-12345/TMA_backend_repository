import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Inventory = sequelize.define('Inventory', {
    InventoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    textbookID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Adjust based on whether this is mandatory
        references: {
            model: 'Textbook', // This should match the name of the Textbook model
            key: 'textbookID',
        },
    },
    quantityAvailable: {
        type: DataTypes.STRING,
        allowNull: true, // Adjust as necessary
    },
    quantityOnLoan: {
        type: DataTypes.STRING,
        allowNull: true, // Adjust as necessary
    },
}, {
    tableName: 'inventories',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

export default Inventory;
