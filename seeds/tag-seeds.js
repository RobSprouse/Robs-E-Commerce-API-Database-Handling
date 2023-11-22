// COMMENT: imports the required module
const { Tag } = require('../models');

// COMMENT: create an array of objects to seed the Tag model
const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// COMMENT: creates a function to seed the Tag model with the tagData array
const seedTags = () => Tag.bulkCreate(tagData);

// COMMENT: export the seedTags function
module.exports = seedTags;
