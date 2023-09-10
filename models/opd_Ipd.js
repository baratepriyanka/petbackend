'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opdIpd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  opdIpd.init({
    patient_id: DataTypes.STRING,
    type_id: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    date: DataTypes.STRING,
    temperature: DataTypes.STRING,
    feeding: DataTypes.STRING,
    clinical_observ: DataTypes.STRING,
    treatment_medicine:DataTypes.STRING,
    case_history:DataTypes.STRING,
    status: DataTypes.TINYINT,
    case_id:DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: 'opd_ipds',
  });
  return opdIpd;
};