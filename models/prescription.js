'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prescription.init({
    date: DataTypes.STRING,
    patientid: DataTypes.STRING,
    doctorid: DataTypes.STRING,
    medicineid: DataTypes.STRING,
    history: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.TINYINT,
    hospital_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};