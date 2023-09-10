
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      hname:{
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      city:{
        type: Sequelize.STRING
      },
      state:{
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('hospitals');
  }
};
