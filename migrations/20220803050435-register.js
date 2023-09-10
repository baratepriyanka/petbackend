'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      first_name: {
        maxLength: 100,
        type: Sequelize.STRING
      },
      last_name: {
        maxLength: 100,
        type: Sequelize.STRING
      },
      email: {
        maxLength: 100,
        type: Sequelize.STRING
      },
      password: {
        maxLength: 255,
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
   
     await queryInterface.dropTable('users');
  
  }
};
