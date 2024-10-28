import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Textbook from './Textbook.js';


class Course extends Model {
    static associate(models) {
        // Define relationships here

        // Course belongs to Textbook
        Course.belongsTo(models.Textbook, {
            foreignKey: 'textbookID',
            targetKey: 'textbookID',
            as: 'textbook'
        });

        // Course belongs to Instructor
        Course.belongsTo(models.Instructor, {
            foreignKey: 'instructorID',
            targetKey: 'instructorID',
        });

        // Course belongs to SecEmployee
        Course.belongsTo(models.SecEmployee, {
            foreignKey: 'sec_Employee_ID',
            targetKey: 'employeeID',
        });

        // Course has many Requests
        Course.hasMany(models.Request, {
            foreignKey: 'courseID',
            sourceKey: 'courseID',
        });
    }
}

// Initialize model schema with init
Course.init(
    {
        courseID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        courseCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
          },
          description: {
            type: DataTypes.TEXT,
          },
          semester: {
            type: DataTypes.STRING(10),
          },
          year: {
            type: DataTypes.INTEGER,
          },
        textbookID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Textbook,
                key: 'textbookID',
            },
        },
        instructorID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Instructor',
                key: 'instructorID',
            },
        },
        sec_Employee_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'SecEmployee',
                key: 'employeeID',
            },
        },
    },
    {
        sequelize,
        modelName: 'Course',
        tableName: 'courses',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Course;
