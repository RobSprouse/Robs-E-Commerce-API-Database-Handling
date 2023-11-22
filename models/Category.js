// COMMENT: imports required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// COMMENT: Initializes the Category model (table) by extending off Sequelize's Model class
class Category extends Model {}

// COMMENT: Sets up fields and rules for Category model
Category.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          category_name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "category",
     }
);

// COMMENT: Exports the Category model for use in other files
module.exports = Category;
