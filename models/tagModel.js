// define tag model object here 
const { Model, DataTypes } = require('sequelize');

class TagModel extends Model {}

TagModel.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true, 
    },
    tag_name: {
      type: DataTypes.STRING, 
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag", // name that is referenced in tables
  }
);
module.exports = TagModel;

















module.exports = TagModel;