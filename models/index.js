// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

/* TODO:
     [x]: 
          * `Product` belongs to `Category`, and 
     [x]: 
          `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.
     [x]: 
          * `Product` belongs to many `Tag` models, and .
     [x]: 
          `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model  Make sure you set up foreign key relationships that match the column we created in the respective models.*/

Product.belongsTo(Category, {
     foreignKey: "Category_id",
});

Category.hasMany(Product, {
     foreignKey: "Category_id",
});

Product.belongsToMany(Tag, {
     through: ProductTag,
     foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
     through: ProductTag,
     foreignKey: "tag_id",
});



module.exports = {
     Product,
     Category,
     Tag,
     ProductTag,
};
