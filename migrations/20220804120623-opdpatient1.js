'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('opdpatients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      patient_name: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      dateofadmission: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      parent_name: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      patient_age:{
        maxLength: 2,
        type: Sequelize.INTEGER
      },
      Breed:{
        maxLength: 50,
        type: Sequelize.STRING
      }, 
      Color:{
        maxLength: 50,
        type: Sequelize.STRING
      },
      description:{
      
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      state: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      genderid: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      mobile: {
      
        type: Sequelize.STRING
      },
      phone: {
     
        type: Sequelize.STRING
      },
      email: {
  
        type: Sequelize.STRING
      },
      whatsapp: {
       
        type: Sequelize.STRING
      },
      pincode: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      case_paper_id: {
        maxLength: 50, 
        type: Sequelize.INTEGER
      },
      species:{
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
        comment: "0 is for active, 1 is for deleted, 2 is for inactive	"
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

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('opdpatients');
  }
};
