"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masteripdcategories",
      [
        {
          categoryid:1,
          name: "Stray",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          categoryid:2,
          name: "Owner",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
              
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masteripdcategories", {}, null);
  },
};
