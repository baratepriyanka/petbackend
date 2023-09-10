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
      parent_name: {
        type: Sequelize.STRING
      },
      reg_no: {
        type: Sequelize.STRING
      },
      date_of_admission: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.STRING
      },
      bill_no: {
        type: Sequelize.STRING
      },
      ward_no: {
        type: Sequelize.STRING
      },
      cage_kennel: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      pet_name: {
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
      xray: {
        type: Sequelize.STRING
      },
      diagnosis: {
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
    await queryInterface.dropTable('Ipds');
  }
};