'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaseManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CaseManager.init({
    patient: DataTypes.STRING(20),
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    case: DataTypes.STRING,
    hospital_id: DataTypes.STRING(20),
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'CaseManager',
  });
  return CaseManager;
};