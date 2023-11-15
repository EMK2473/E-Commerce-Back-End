const { ProductTagModel } = require('../models');
// import the model of each data base model for row/column properties

// 5 product ids
const prodTagData = [
    {
      product_id: 1,
      tag_id: 6,
    },
    {
      product_id: 2,
      tag_id: 7,
    },
    {
      product_id: 3,
      tag_id: 8,
    },
    {
      product_id: 4,
      tag_id: 6,
    },
    {
      product_id: 5,
      tag_id: 1,
    },
  ];
  
  const seedProdTags = () => ProductTagModel.bulkCreate(prodTagData);

module.exports = seedProdTags;