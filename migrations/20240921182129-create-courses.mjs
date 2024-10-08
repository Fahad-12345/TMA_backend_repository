import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('courses', {
    courseID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    textbookID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'textbooks',
        key: 'textbookID',
      },
    },
    instructorID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'instructors',
        key: 'instructorID',
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
