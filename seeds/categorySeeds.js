const { CategoryModel } = require("../models");
// import the model of each data base model for row/column properties
// define category seed here

// 5 categories
const categorySeedData = [
  {
    categoryName: "Fiction",
  },
  {
    categoryName: "Non-Fiction",
  },
  {
    categoryName: "Short-Story",
  },
  {
    categoryName: "Children's-Book",
  },
  {
    categoryName: "Biography",
  },
];
const seedCategories = () => CategoryModel.bulkCreate(categorySeedData);
// category seed function to call
// categories => CategoryModelObject bulkCreate(categoryData)
// import category model object and make it bulk create an array of category objects
// page for seeded data for each category

module.exports = seedCategories;
