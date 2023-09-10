'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ipds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      parentname: {
        type: Sequelize.STRING
      },
      regno: {
        type: Sequelize.STRING
      },
      dateofadmission: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.STRING
      },
      billno: {
        type: Sequelize.STRING
      },
      wardno: {
        type: Sequelize.STRING
      },
      cagekennel: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      petname: {
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
      gender: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ipds');
  }
};