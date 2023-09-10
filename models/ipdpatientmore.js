'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ipdPatientMore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ipdPatientMore.init({
    type: DataTypes.STRING,
    temp: DataTypes.STRING,
    feeding: DataTypes.STRING,
    clinical: DataTypes.STRING,
    treatment: DataTypes.STRING,
    ipdId: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    case_history:DataTypes.STRING,
    added_type:DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'ipdPatientMore',
  });
  return ipdPatientMore;
};