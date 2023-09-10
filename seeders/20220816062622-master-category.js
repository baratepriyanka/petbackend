"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "mastercategories",
      [
        {
          categoryid:1,
          name: "Med Category 1",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          categoryid:2,
          name: "Med Category 2",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          categoryid:3,
          name: "Med Category 3",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("mastercategories", {}, null);
  },
};
 