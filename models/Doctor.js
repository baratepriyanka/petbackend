'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // kjlhgkj
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    doctor_name: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    department: DataTypes.STRING,
    profile: DataTypes.STRING,
    s3image: DataTypes.STRING,
    education : DataTypes.STRING,
    gender:  DataTypes.STRING,
    hospital_id:  DataTypes.STRING,
    status: DataTypes.TINYINT,
    
   
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};
