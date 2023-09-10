'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opdIpdPatientMediaTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  opdIpdPatientMediaTypes.init({
    patient_id: DataTypes.STRING,
    opd_ipd_id: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.TINYINT,
    s3_url: DataTypes.STRING,
    img_url_type: DataTypes.STRING,
    hospital_id: DataTypes.STRING(20),
    case_id: DataTypes.STRING(20),
    // s3_url:
  }, {
    sequelize,
    modelName: 'opd_ipd_patient_media_types',
  });
  return opdIpdPatientMediaTypes;
};