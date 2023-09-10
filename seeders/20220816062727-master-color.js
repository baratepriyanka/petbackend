"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "mastercolors",
      [
        {
          colorid: 1,
          name: "Brown",        
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 2,
          name: "Red",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 3,
          name: "Gold",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 4,
          name: "Black",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 5,
          name: "White",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 6,
          name: "Yellow",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 7,
          name: "Cream",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 8,
          name: "Grey",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          colorid: 9,
          name: "Blue",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("mastercolors", {}, null);
  },
};
