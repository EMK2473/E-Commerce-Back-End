// definine category model object here
// define columns for category in database
const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connect");

class CategoryModel extends Model {}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category', // name that is referenced in tables
  }
);

module.exports = CategoryModel;