// COMMENT: imports required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// COMMENT: Initializes the Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// COMMENT: Sets up fields and rules for Tag model
Tag.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          tag_name: {
               type: DataTypes.STRING,
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "tag",
     }
);

// COMMENT: Exports the Tag model for use in other files
module.exports = Tag;
