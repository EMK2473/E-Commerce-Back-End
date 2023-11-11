const { CategoryModel } = require('../models');
// import the model of each data base model for row/column properties

// define category seed here
const categorySeedData = [
    {
        categoryName: 'Category1'
    },
    {
        categoryName: 'Category2'
    },
    {
        categoryName: 'Category3'
    },
    {
        categoryName: 'Category4'
    },
    {
        categoryName: 'Category5'
    },]
const seedCategories = () => CategoryModel.bulkCreate(categorySeedData);
// category seed function to call
// categories => CategoryModelObject bulkCreate(categoryData)
// import category model object and make it bulk create an array of category objects

// page for seeded data for each category 


module.exports = seedCategories;