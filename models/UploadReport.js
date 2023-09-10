'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UploadReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UploadReport.init({
    report_type: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
   
  }, {
    sequelize,
    modelName: 'masteruploadreports',
  });
  return UploadReport;
};
