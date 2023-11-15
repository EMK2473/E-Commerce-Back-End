const { TagModel } = require('../models');
// import the model of each data base model for row/column properties

// 5 tags
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
  ];
  
  const seedTags = () => TagModel.bulkCreate(tagData);



module.exports = seedTags;
