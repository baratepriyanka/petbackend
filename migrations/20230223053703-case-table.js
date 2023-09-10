'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('case_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      patient_id: {
        type: Sequelize.STRING(20)
      },
      hospital_id: {
        type: Sequelize.STRING(20)
      },
      case_id: {
        type: Sequelize.STRING(20)
      },
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
        comment: " 1 is for open, 2 is for close"
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


  
  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('case_tables');
  }
};
