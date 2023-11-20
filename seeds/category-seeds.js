// COMMENT: imports the required module
const { Category } = require('../models');

// COMMENT: create an array of objects to seed the Category model
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// COMMENT: creates a function to seed the Category model with the categoryData array
const seedCategories = () => Category.bulkCreate(categoryData);

// COMMENT: export the seedCategories function
module.exports = seedCategories;
