'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      profileId:{
        type: Sequelize.STRING
      },
      
      profile: {
       
        type: Sequelize.STRING
      },
      s3image:{
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

    await queryInterface.dropTable('images');
  }
};
