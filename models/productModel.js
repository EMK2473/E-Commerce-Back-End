// define product model object here
// define columns for product in database
const { Model, DataTypes } = require('sequelize');

class ProductModel extends Model {}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true, 
      },
    },
    stock: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 10,
        validate: {
          isNumeric: true, 
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category", 
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);
module.exports = ProductModel;