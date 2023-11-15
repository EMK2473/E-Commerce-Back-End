// define product tag model object here
// define columns for product tag in database
const { Model, DataTypes } = require('sequelize');

const sequelize = require("../config/connection");

class ProductTagModel extends Model {}

ProductTagModel.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true, 
    },
    tag_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: "tag",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: "product", 
        key: "id", 
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag", // name that is referenced in tables
  }
);
module.exports = ProductTagModel;















module.exports = ProductTagModel;