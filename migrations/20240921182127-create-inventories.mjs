import { DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('inventories', {
    InventoryID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    textbookID: {
      foreignkey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'textbooks',
        key: 'textbookID',
      }
    },
    quantityAvailable: {
      type: DataTypes.STRING,
    },
    quantityOnLoan: {
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
  await queryInterface.dropTable('inventories');
};
