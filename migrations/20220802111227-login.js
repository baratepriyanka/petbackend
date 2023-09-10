'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
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
    await queryInterface.dropTable('logins');
  
  }
};
