"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterbedcategories",
      [
        {
          name: "ICU",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          name: "CCU",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          name: "Childeren",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          name: "General Ward",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterbedcategories", {}, null);
  },
};
 