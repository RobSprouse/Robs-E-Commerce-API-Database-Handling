// COMMENT: imports required modules
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// COMMENT: Sets up associations between models
Product.belongsTo(Category, {
     foreignKey: "category_id",
});

Category.hasMany(Product, {
     foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
     through: ProductTag,
     foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
     through: ProductTag,
     foreignKey: "tag_id",
});


// COMMENT: Export modules
module.exports = {
     Product,
     Category,
     Tag,
     ProductTag,
};
