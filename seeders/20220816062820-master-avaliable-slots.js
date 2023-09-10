"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masteravaliableslots",
      [
        {
          avaliable_slotid: 1,
          name: "12AM - 1PM",          
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          avaliable_slotid: 2,
          name: "1PM - 2PM",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          avaliable_slotid: 3,
          name: "2PM - 3PM",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masteravaliableslots", {}, null);
  },
};
