'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicine_name: {
        type: Sequelize.STRING
      },
      Patient_id: {
        type: Sequelize.STRING
      },
      purchase_price: {
        type: Sequelize.STRING
      },
      sale_price: {
        type: Sequelize.STRING
      },
      // generic_name: {
      //   type: Sequelize.STRING
      // },
      // quantity: {
      //   type: Sequelize.STRING
      // },
      doctor_id: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      effects: {
        type: Sequelize.STRING
      },
      store_box: {
        type: Sequelize.STRING
      },
      exp_date: {
        type: Sequelize.STRING
      },
      category: {
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
    await queryInterface.dropTable('Medicines');
  }
};