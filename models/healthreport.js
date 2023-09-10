'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class healthreport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  healthreport.init({
    certified_reason: DataTypes.STRING,
    animal: DataTypes.STRING,
    hospital_id:DataTypes.STRING,
    patient_id:DataTypes.STRING,
    case_id:DataTypes.STRING,
    contract_no:DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'healthreport',
  });
  return healthreport;
};