// define tag model object here 
const { Model, DataTypes } = require('sequelize');

class TagModel extends Model {}

TagModel.init(
  {
    // Define columns for the tag table
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
    modelName: "tag",
  }
);

module.exports = TagModel;

















module.exports = TagModel;