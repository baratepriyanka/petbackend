'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deathreports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
         type: Sequelize.STRING(20)
       },
       hospital_id: {
        type: Sequelize.STRING(20)
      },
      contract_no: {
        type: Sequelize.STRING(20)
      },
      date_of_release: {
        type: Sequelize.STRING
      },
     certified_reason:{
      type: Sequelize.STRING
     },
      cause_of_death: {
        type: Sequelize.STRING
      },
      cause_of_treatment: {
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
    await queryInterface.dropTable('deathreports');
  }
  
};