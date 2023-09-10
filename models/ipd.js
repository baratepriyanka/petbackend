'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ipd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ipd.init({
    category: DataTypes.STRING,
    parent_name: DataTypes.STRING,
    reg_no: DataTypes.STRING,
    date_of_admission: DataTypes.STRING,
    address: DataTypes.STRING,
    fee: DataTypes.STRING,
    bill_no: DataTypes.STRING,
    ward_no: DataTypes.STRING,
    cage_kennel: DataTypes.STRING,
    mobile: DataTypes.STRING,
    pet_name: DataTypes.STRING,
    breed: DataTypes.STRING,
    species: DataTypes.STRING,
    color: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    weight: DataTypes.STRING,
    xray: DataTypes.STRING,
    diagnosis: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ipd',
  });
  return Ipd;
};