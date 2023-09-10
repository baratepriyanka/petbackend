'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterWardNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterWardNumber.init({
    ward_no: DataTypes.STRING,
    value: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'masterwardnumbers',
  });
  return MasterWardNumber;
};
