'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      doctor_name: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      doctor_id: {
        type: Sequelize.STRING
      },
      email: {
        
        type: Sequelize.STRING
      },
      address: {
        
        type: Sequelize.STRING
      },
      password: {
        
        type: Sequelize.STRING
      },
      phone: {
     
        type: Sequelize.STRING
      },
      department: {
       
        type: Sequelize.STRING
      },
      profile: {
       
        type: Sequelize.STRING
      },
      s3image:{
        type: Sequelize.STRING
      },
      education: {
        maxLength: 50, 
        type: Sequelize.STRING
      },
      gender:{
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

  
  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('doctors');
  }
};
