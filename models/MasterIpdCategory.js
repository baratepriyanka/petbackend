'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterIpdCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterIpdCategory.init({
    // id: DataTypes.STRING,
    categoryid: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
   
  }, {
    sequelize,
    modelName: 'masteripdcategory',
  });
  return MasterIpdCategory;
};
