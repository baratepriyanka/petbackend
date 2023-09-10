'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bedAllotment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bedAllotment.init({
    bedId: DataTypes.STRING,
    patient: DataTypes.STRING,
    allotedTime: DataTypes.STRING,
    dischargeTime: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'bedAllotment',
  });
  return bedAllotment;
};