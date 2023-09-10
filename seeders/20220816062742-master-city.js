"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "MasterCities",
      [
        {
          cityid: 1,
          name: "Pune",        
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          cityid: 2,
          name: "Nashik",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          cityid: 3,
          name: "Satara",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          cityid: 4,
          name: "Solapur",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          cityid:5,
          name: "Thane",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          cityid: 6,
          name: "Ratnagiri",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("MasterCities", {}, null);
  },
};
