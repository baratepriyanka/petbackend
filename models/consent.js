'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  consent.init({
    ownerName: DataTypes.STRING,
    dateOfAdmission: DataTypes.STRING,
    contractNo: DataTypes.STRING,
    address: DataTypes.STRING,
    breed: DataTypes.STRING,
    species: DataTypes.STRING,
    color: DataTypes.STRING,
    age: DataTypes.STRING,
    genderid: DataTypes.STRING,
    undersigned: DataTypes.STRING,
    time: DataTypes.STRING,
    idNo: DataTypes.STRING,
    vehicleNo: DataTypes.STRING,
    hospital_id:DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'consent',
  });
  return consent;
};