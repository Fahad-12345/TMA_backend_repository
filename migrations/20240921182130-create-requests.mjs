import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("requests", {
    requestID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      foreignkey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "userID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
    },
    textbookID: {
      foreignkey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "textbooks",
        key: "textbookID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("requests");
};
