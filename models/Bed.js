'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Bed.init({
    bedid: DataTypes.STRING,
    bedcategory: DataTypes.STRING,
    ward_no: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    in_used: DataTypes.STRING,
    Patient_id: DataTypes.BIGINT(20),
    doctor_id: DataTypes.INTEGER,
    hospital_id:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bed',
  });
  return Bed;
};
