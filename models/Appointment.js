'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    user_id: DataTypes.STRING,
    patient: DataTypes.STRING,
    date: DataTypes.STRING,
    available_slot: DataTypes.STRING,
    appointment_status: DataTypes.STRING,
    remarks: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    status: DataTypes.TINYINT,
    appointment_id:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'appointment',
  });
  return Appointment;
};
