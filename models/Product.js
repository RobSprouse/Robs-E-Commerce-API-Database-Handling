// COMMENT: imports required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


// COMMENT: Initializes the Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// COMMENT: Sets up fields and rules for Product model
Product.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          product_name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          price: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
               validate: {
                    isDecimal: true,
               },
          },
          stock: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 10,
               validate: {
                    isNumeric: true,
               },
          },
          category_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "category",
                    key: "id",
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "product",
     }
);

// COMMENT: Exports the Product model for use in other files
module.exports = Product;
