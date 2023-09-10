'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opd_ipds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.STRING
      },
      type_id: {
        defaultValue: 1,
        type: Sequelize.STRING,
        comment: "1 is for opd, 2 is for ipd"
      },
      hospital_id:{  type: Sequelize.STRING
      },

      date: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.STRING
      },
      feeding: {
        type: Sequelize.STRING
      },
      clinical_observ: {
        type: Sequelize.STRING
      },
      treatment_medicine: {
        type: Sequelize.STRING
      },
      case_history:{type: Sequelize.STRING 
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
    await queryInterface.dropTable('opd_ipds');
  }
};