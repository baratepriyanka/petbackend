'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpdPatientMore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OpdPatientMore.init({
    
    date_type: DataTypes.STRING,
    trea_medicine_adv: DataTypes.STRING,
    case_history: DataTypes.STRING,
    opdId: DataTypes.STRING,
    status: DataTypes.TINYINT,
   
    
   
  }, {
    sequelize,
    modelName: 'OpdPatientMore',
  });
  return OpdPatientMore;
};
