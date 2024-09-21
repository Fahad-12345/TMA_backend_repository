import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('inventories', {
    textbookID: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'textbooks',
        key: 'textbookID',
      },
    },
    quantityAvailable: {
      type: DataTypes.INTEGER,
    },
    quantityOnLoan: {
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
  await queryInterface.dropTable('inventories');
};
