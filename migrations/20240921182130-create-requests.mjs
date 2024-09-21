import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('requests', {
    requestID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'userID',
      },
    },
    textbookID: {
      type: DataTypes.STRING,
      references: {
        model: 'textbooks',
        key: 'textbookID',
      },
    },
    date: {
      type: DataTypes.DATE,
    },
    status: {
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
  await queryInterface.dropTable('requests');
};
