import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {
    static associate(models) {
        // Define relationships here

        // User has one SecEmployee
        User.hasOne(models.SecEmployee, {
            foreignKey: 'userID',
            sourceKey: 'userID',
        });

        // User has many Requests
        User.hasMany(models.Request, {
            foreignKey: 'userID',
            sourceKey: 'userID',
        });

        // User has many Instructors
        User.hasMany(models.Instructor, {
            foreignKey: 'userID',
            sourceKey: 'userID',
        });
    }
}

// Initialize model schema with init
User.init(
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default User;
