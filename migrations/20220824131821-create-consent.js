'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerName: {
        type: Sequelize.STRING
      },
      contractNo: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      dateOfAdmission:{
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      genderid: {
        type: Sequelize.STRING
      },
      undersigned: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      idNo: {
        type: Sequelize.STRING
      },
      vehicleNo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
        comment: "0 is for active, 1 is for deleted, 2 is for inactive	"
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('consents');
  }
};