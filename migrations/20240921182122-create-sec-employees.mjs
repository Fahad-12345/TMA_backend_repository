import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('sec_employees', {
    userID: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userID',
      },
    },
    enrollmentYear: {
      type: DataTypes.INTEGER,
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
  await queryInterface.dropTable('sec_employees');
};
