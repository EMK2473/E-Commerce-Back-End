const { TagModel } = require('../models');
// import the model of each data base model for row/column properties
const tagData = [
    {
      tag_name: 'tag1',
    },
    {
      tag_name: 'tag2',
    },
    {
      tag_name: 'tag3',
    },
    {
      tag_name: 'tag4',
    },
    {
      tag_name: 'tag5',
    },
    {
      tag_name: 'tag6',
    },
    {
      tag_name: 'tag7',
    },
  ];
  
  const seedTags = () => TagModel.bulkCreate(tagData);



module.exports = seedTags;
