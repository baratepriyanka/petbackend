'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deathreport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deathreport.init({
    patient_id:  DataTypes.STRING,
    date_of_release: DataTypes.STRING, 
    certified_reason:DataTypes.STRING,
    cause_of_death:  DataTypes.STRING,
    cause_of_treatment:  DataTypes.STRING,
    hospital_id:DataTypes.STRING,
    contract_no:DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'deathreport',
  });
  return deathreport;
};