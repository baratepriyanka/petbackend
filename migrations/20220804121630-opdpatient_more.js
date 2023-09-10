'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('opdpatientmores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      date_type:{
        type: Sequelize.STRING,
        maxLength: 50
      },
      case_history: {
        type: Sequelize.STRING,
        maxLength: 100
      },
      trea_medicine_adv:{
        type: Sequelize.STRING,
        maxLength: 500
      },
      opdId:{
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
        comment: "0 is for active, 1 is for inactive"
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('opdpatientmores');
  }
};
