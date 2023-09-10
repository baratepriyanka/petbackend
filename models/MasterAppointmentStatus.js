'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterAppointmentStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterAppointmentStatus.init({
    // id: DataTypes.STRING,
    appointment_statusid: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
   
  }, {
    sequelize,
    modelName: 'masterappointmentstatus',
  });
  return MasterAppointmentStatus;
};
