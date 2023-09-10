"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all(
      [
        queryInterface.addColumn(
          "images", // table name
          "hospital_id", // new field name
          {
            type: Sequelize.STRING(20),
            after: "profileid",
          }
        ),
      ],
      [
        queryInterface.addColumn(
          "images", // table name
          "case_id", // new field name
          {
            type: Sequelize.STRING(20),
            after: "hospital_id",
          }
        ),
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("images", "hospital_id"),
      queryInterface.removeColumn("images", "case_id"),
    ]);
  },
};
