const { ProductModel } = require('../models');
// import the model of each data base model for row/column properties

// define product seed here

const productData = [
    {
        productName: 'prodName1',
        price: '0.99',
        stock: '1',
        categoryID: 1,
    },
    {
        productName: 'prodName2',
        price: '0.99',
        stock: '1',
        categoryID: 2,
    },
    {
        productName: 'prodName3',
        price: '0.99',
        stock: '1',
        categoryID: 3,
    },
    {
        productName: 'prodName4',
        price: '0.99',
        stock: '1',
        categoryID: 4,
    },
]

// productData == []
// productObject1
    // categoryID
// productObject2
    // categoryID
// productObject3
    // categoryID
// productObject4
    // categoryID
// productObject5
    // categoryID
// productObject6
    // categoryID

const seedProducts = () => ProductModel.bulkCreate(productData)
module.exports = seedProducts;