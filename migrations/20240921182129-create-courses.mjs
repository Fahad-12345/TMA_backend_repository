import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('courses', {
    courseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    courseName: {
      type: DataTypes.STRING,
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
    instructorID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'instructors',
        key: 'instructorID',
      },
    },
    sec_Employee_ID: {
      type: DataTypes.INTEGER,
      references: {
          model: 'sec_employees', 
          key: 'employeeID',
      },
  },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('courses');
};
