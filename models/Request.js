import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Request extends Model {
    static associate(models) {
        // Define relationships here

        // Request belongs to User
        Request.belongsTo(models.User, {
            foreignKey: 'userID',
            targetKey: 'userID',
        });

        // Request belongs to Course
        Request.belongsTo(models.Course, {
            foreignKey: 'courseID',
            targetKey: 'courseID',
        });

        // Request belongs to Textbook
        Request.belongsTo(models.Textbook, {
            foreignKey: 'textbookID',
            targetKey: 'textbookID',
        });
    }
}

// Initialize model schema with init
Request.init(
    {
        requestID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'User',
                key: 'userID',
            },
        },
        textbookID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Textbook',
                key: 'textbookID',
            },
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Request',
        tableName: 'requests',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Request;
