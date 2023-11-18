const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

/* TODO: 
      * `Category`
      
        * `id`
      
          * Integer.
        
          * Doesn't allow null values.
        
          * Set as primary key.
        
          * Uses auto increment.
      
        * `category_name`
        
          * String.
        
          * Doesn't allow null values. */

class Category extends Model {}

Category.init(
     {
          // define columns
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "category",
     }
);

module.exports = Category;
