'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opd_ipd_patient_media_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.STRING
      },
      opd_ipd_id: {
        type: Sequelize.STRING,
        comment: "if_any"
      },
      url: {
        type: Sequelize.STRING,
        comment: "1 is for blood test, 2 is for mri test, 3 is for x-ray test "
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('opd_ipd_patient_media_types');
  }
};