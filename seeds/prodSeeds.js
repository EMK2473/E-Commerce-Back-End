const { ProductModel } = require('../models');
// import the model of each data base model for row/column properties

// define product seed here

const productData = [
    {
        productName: 'prodName1',
        price: '0.99',
        stock: '1',
        category_id: 1,
    },
    {
        productName: 'prodName2',
        price: '0.99',
        stock: '1',
        category_id: 2,
    },
    {
        productName: 'prodName3',
        price: '0.99',
        stock: '1',
        category_id: 3,
    },
    {
        productName: 'prodName4',
        price: '0.99',
        stock: '1',
        category_id: 4,
    },
]

// productData == []
// productObject1
    // category_id
// productObject2
    // category_id
// productObject3
    // category_id
// productObject4
    // category_id
// productObject5
    // category_id
// productObject6
    // category_id

const seedProducts = () => ProductModel.bulkCreate(productData)
module.exports = seedProducts;