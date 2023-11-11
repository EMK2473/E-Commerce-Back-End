// import model paths
const ProductModel = require('./productModel');
const CategoryModel = require('./categoryModel');
const TagModel = require('./tagModel');
const ProductTagModel = require('./productTagModel');
// models are the models for each column the data tables
// each column is defined by their properties keys&&values





// relate the models here
// using belongs and has methods
// belongsTo 
// belongsToMany
// and hasmany
// export the models here as object




module.exports = {
    ProductModel,
    CategoryModel,
    TagModel,
    ProductTagModel,
  };