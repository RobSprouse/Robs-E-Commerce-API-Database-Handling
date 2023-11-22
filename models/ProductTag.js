// COMMENT: import required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// COMMENT: Initializes the ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// COMMENT: Sets up fields and rules for ProductTag model
ProductTag.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          product_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "product",
                    key: "id",
               },
          },
          tag_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "tag",
                    key: "id",
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "product_tag",
     }
);

// COMMENT: Exports the ProductTag model for use in other files
module.exports = ProductTag;
