'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterColor.init({
    // id: DataTypes.STRING,
    colorid: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
   
  }, {
    sequelize,
    modelName: 'mastercolor',
  });
  return MasterColor;
};
