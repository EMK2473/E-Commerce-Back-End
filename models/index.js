// import model paths
const ProductModel = require("./productModel");
const CategoryModel = require("./categoryModel");
const TagModel = require("./tagModel");
const ProductTagModel = require("./productTagModel");
// models are the models for each column the data tables
// each column is defined by their properties keys&&values

// relate the models here
// using belongs and has methods
// belongsTo
// belongsToMany
// and hasmany
// export the models here as object


ProductModel.belongsTo(CategoryModel, {
  foreignKey: 'category_id',
});

ProductModel.belongsToMany(TagModel, {
  through: ProductTagModel,
  foreignKey: 'product_id'
});

TagModel.belongsToMany(ProductModel, {
  through: ProductTagModel,
  foreignKey: 'tag_id'
});

CategoryModel.hasMany(ProductModel, {
  foreignKey: 'category_id'
});

module.exports = {
  ProductModel,
  CategoryModel,
  TagModel,
  ProductTagModel,
};
