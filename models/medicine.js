'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medicine.init({
    medicine_name: DataTypes.STRING,
    Patient_id: DataTypes.STRING,
    purchase_price: DataTypes.STRING,
    sale_price: DataTypes.STRING,
    generic_name: DataTypes.STRING,
    quantity: DataTypes.STRING,
    company: DataTypes.STRING,
    effects: DataTypes.STRING,
    store_box: DataTypes.STRING,
    exp_date: DataTypes.DATE,
    category: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};