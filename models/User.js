"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      user_id:DataTypes.STRING,
      user_type:DataTypes.STRING,
      hospital_id:DataTypes.STRING,
      phone:DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile: DataTypes.STRING,
      s3image: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      address: DataTypes.STRING,
      token: DataTypes.STRING,
      department:DataTypes.TINYINT,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "user",
    },
   
  );
  return user;
};
