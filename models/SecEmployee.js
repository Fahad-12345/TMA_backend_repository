import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class SecEmployee extends Model {
    static associate(models) {
        // Define relationships here

        // SecEmployee belongs to User
        SecEmployee.belongsTo(models.User, {
            foreignKey: 'userID',
            targetKey: 'userID',
        });

        // SecEmployee belongs to many Courses (many-to-many relationship through EmployeeCourses)
        SecEmployee.belongsToMany(models.Course, {
            through: 'EmployeeCourses',
            foreignKey: 'employeeID',
            otherKey: 'courseID',
        });
    }
}

// Initialize model schema with init
SecEmployee.init(
    {
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
                model: 'User', // Reference to the User model
                key: 'userID',
            },
        },
        enrollmentYear: {
            type: DataTypes.INTEGER,
        },
        department: {
            type: DataTypes.STRING,
        },
        coursesTaught: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'SecEmployee',
        tableName: 'sec_employees',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default SecEmployee;
