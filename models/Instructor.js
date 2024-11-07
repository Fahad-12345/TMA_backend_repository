import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Instructor extends Model {
  static associate(models) {
    // Define relationships here

    // Instructor belongs to User
    Instructor.belongsTo(models.User, {
      foreignKey: "userID",
      targetKey: "userID",
    });

    // Instructor has many Courses
    Instructor.hasMany(models.Course, {
      foreignKey: "instructorID",
      sourceKey: "instructorID",
    });
  }
}

// Initialize model schema with init
Instructor.init(
  {
    instructorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Reference to the User model
        key: "userID",
      },
      onDelete: "CASCADE", // this will allow cascading deletes
      onUpdate: "CASCADE",
    },
    department: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Instructor",
    tableName: "instructors",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Instructor;
