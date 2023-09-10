"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  documents.init(
    {
      patient: DataTypes.STRING,
      date: DataTypes.STRING,
      description: DataTypes.STRING,
      document: DataTypes.STRING,
      s3image: DataTypes.STRING,
      hospital_id:  DataTypes.STRING,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "documents",
    }
  );
  return documents;
};
