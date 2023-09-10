'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateofadmission: {
        type: Sequelize.STRING
      },
      patient_name: {
        type: Sequelize.STRING
      },
      parent_name: {
        type: Sequelize.STRING
      },
      patient_age: {
        type: Sequelize.STRING
      },
      Breed: {
        type: Sequelize.STRING
      },
      Color: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      genderid: {
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
    await queryInterface.dropTable('opds');
  }
};