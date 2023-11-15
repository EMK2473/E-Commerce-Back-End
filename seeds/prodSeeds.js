const { ProductModel } = require('../models');
// import the model of each data base model for row/column properties

// define product seed here

// 5 book products
// added authors to base model set
const productData = [
    {
        productName: "A good man is hard to find",
        author: "Flannery O'Connor",
        price: '9.99',
        stock: '10',
        category_id: 1, // short story
    },
    {
        productName: 'Divine Comedy Trilogy: The Inferno, Purgatory, Paradise',
        author: "Dante Alighieri",
        price: '19.99',
        stock: '5',
        category_id: 2, // Fiction
    },
    {
        productName: 'Scar Tissue',
        author: "Anthony Kedis",
        price: '9.99',
        stock: '5',
        category_id: 3, // biography
    },
    {
        productName: 'Art of War',
        author: "Sun Tzu",
        price: '19.99',
        stock: '1',
        category_id: 4, // non-fiction
    },
    {
        productName: "Aesop's Fables: The Classic Edition",
        author: "Charles Santore",
        price: '19.99',
        stock: '1',
        category_id: 5, // children's book
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

const seedProducts = () => ProductModel.bulkCreate(productData)
module.exports = seedProducts;