import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Inventory extends Model {
  static associate(models) {
    // Define relationships here

    // Inventory belongs to Textbook
    Inventory.belongsTo(models.Textbook, {
      foreignKey: "textbookID",
      targetKey: "textbookID",
    });
  }
}

// Initialize model schema with init
Inventory.init(
  {
    InventoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    textbookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Textbook", // Reference to the Textbook model
        key: "textbookID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
    },
    quantityAvailable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantityOnLoan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
    tableName: "inventories",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Inventory;
