import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


class Textbook extends Model {
    static associate(models) {
        // Define relationships here

        // Textbook has many Inventories
        Textbook.hasMany(models.Inventory, {
            foreignKey: 'textbookID',
            sourceKey: 'textbookID',
        });

        // Textbook has many Courses
        Textbook.hasMany(models.Course, {
            foreignKey: 'textbookID',
            sourceKey: 'textbookID',
            as: 'courses'
        });
    }
}

// Initialize model schema with init
Textbook.init(
    {
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
    },
    {
        sequelize,
        modelName: 'Textbook',
        tableName: 'textbooks',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Textbook;
