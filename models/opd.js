'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  opd.init({
    dateofadmission: DataTypes.STRING,
    patient_name: DataTypes.STRING,
    parent_name: DataTypes.STRING,
    patient_age: DataTypes.STRING,
    Breed: DataTypes.STRING,
    Color: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobile: DataTypes.STRING,
    species: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    pincode: DataTypes.STRING,
    genderid: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'opd',
  });
  return opd;
};