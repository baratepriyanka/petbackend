'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterBloodGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterBloodGroups.init({
    // id: DataTypes.STRING,
    bloodgroupid: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
   
  }, {
    sequelize,
    modelName: 'masterbloodgroups',
  });
  return MasterBloodGroups;
};
