'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('masterappointmentstatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      name:{
        type:Sequelize.STRING
      },
     appointment_statusid:{
        type:Sequelize.STRING
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

    await queryInterface.dropTable('masterappointmentstatuses');
  }
};
