'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  images.init(
    {
      profile: DataTypes.STRING,
      profileid: DataTypes.STRING,
      s3image: DataTypes.STRING,
      status: DataTypes.TINYINT,
      hospital_id: DataTypes.STRING(20),
      case_id:DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: "images",
    }
  );
  return images;
};
