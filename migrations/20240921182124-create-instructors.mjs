import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('instructors', {
    userID: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userID',
      },
    },
    department: {
      type: DataTypes.STRING,
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
  await queryInterface.dropTable('instructors');
};
