'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpdPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OpdPatient.init({
    
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
    mobile: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    pincode: DataTypes.STRING,
    genderid : DataTypes.STRING,
    case_paper_id:  DataTypes.INTEGER,
    species : DataTypes.STRING,
    status: DataTypes.TINYINT,    
    
   
  }, {sequelize });
  OpdPatient.associate = function(models) {
    // associations can be defined here
    OpdPatient.hasMany(models.OpdPatientMore, { as: "OpdPatientMore", foreignKey: "patient_id", sourceKey: "id"});
  };
  return OpdPatient;
};