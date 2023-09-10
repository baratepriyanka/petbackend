'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaseTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CaseTable.init({
    patient_id: DataTypes.STRING(20),
    case_id: DataTypes.STRING(20),
    hospital_id: DataTypes.STRING(20),
    health_id:DataTypes.STRING(20),
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'case_tables',
  });
  return CaseTable;
};