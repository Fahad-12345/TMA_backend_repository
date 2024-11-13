import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Textbook extends Model {
  static associate(models) {
    // Define relationships here

    // Textbook belongs to Courses
    Textbook.belongsTo(models.Course, {
      foreignKey: "textbookID",
      sourceKey: "textbookID",
    });

    // Textbook has many Inventories
    Textbook.hasMany(models.Inventory, {
      foreignKey: "textbookID",
      sourceKey: "textbookID",
    });
  }
}

// Initialize model schema with init
Textbook.init(
  {
    textbookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Course",
        key: "courseID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
    },
    textBooktitle: {
      type: DataTypes.STRING,
      allowNull: true, // Change to false if title is mandatory
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true, // Change to false if author is mandatory
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: true, // Change to false if ISBN is mandatory
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: true, // Change to false if edition is mandatory
    },
    availabilityStatus: {
      type: DataTypes.STRING,
      allowNull: true, // Change to false if availability status is mandatory
    },
    e_book: {
      // New column
      type: DataTypes.BOOLEAN, // Assuming this indicates if an e-book is available
      defaultValue: false,
    },
    hard_copy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    no_of_hardCopies: {
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
  },
  {
    sequelize,
    modelName: "Textbook",
    tableName: "textbooks",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Textbook;
