'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clinicmanagements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      clinic_name:{
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING
      },
      
      status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('clinicmanagements');
  }
};