import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("textbooks", {
    textbookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseID: {
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "courseID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
    },
    textBooktitle: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    ISBN: {
      type: DataTypes.STRING,
    },
    edition: {
      type: DataTypes.INTEGER,
    },
    availabilityStatus: {
      type: DataTypes.STRING,
    },
    e_book: {
      // New column
      type: DataTypes.BOOLEAN, // Assuming this indicates if an e-book is available
      defaultValue: false,
    },
    hard_copies: {
      // New column
      type: DataTypes.INTEGER, // Number of hard copies available
      defaultValue: 0,
    },
    date_of_publish: {
      // New column
      type: DataTypes.DATE, // Date when the book was published
    },
    latest_version: {
      // New column
      type: DataTypes.STRING, // Latest version information
    },
    old_version: {
      // New column
      type: DataTypes.STRING, // Old version information
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
  await queryInterface.dropTable("textbooks");
};
