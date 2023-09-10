'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      patient_name: DataTypes.STRING,
      patient_id: DataTypes.STRING(20),
      email: DataTypes.STRING,
      phone: DataTypes.STRING(50),
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      birthday: DataTypes.STRING,
      gender: DataTypes.TINYINT,
      bloodgroup: DataTypes.STRING,
      doctor_id: DataTypes.BIGINT,
      profile: DataTypes.STRING,
      s3image: DataTypes.STRING,
      added_from: DataTypes.STRING,
      cage_id: DataTypes.TINYINT,
      dateofadmission: DataTypes.DATE,
      parent_name: DataTypes.STRING,
      breed: DataTypes.TINYINT,
      color: DataTypes.TINYINT,
      species: DataTypes.TINYINT,
      city: DataTypes.TINYINT,
      state: DataTypes.TINYINT,
      description: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      category: DataTypes.TINYINT,
      reg_no: DataTypes.STRING(20),
      ward_no: DataTypes.TINYINT,
      bill_no: DataTypes.STRING(20),
      age: DataTypes.TINYINT,
      weight: DataTypes.TINYINT,
      xray: DataTypes.STRING,
      diagnosis: DataTypes.STRING, 
      fee: DataTypes.TINYINT,  
      status: DataTypes.TINYINT,
      cage_kennel: DataTypes.TINYINT,
      hospital_id:DataTypes.STRING(20),
      discharge_death_status:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
