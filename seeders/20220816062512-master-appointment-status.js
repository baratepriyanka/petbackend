"use strict";
 
module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterappointmentstatuses",
      [
        {
          appointment_statusid:1,
          name: "Pending confirmation",
          // createdAt:currentTime,
          // updatedAt:currentTime
        },
        {
          appointment_statusid:2,
          name: "Confirmed",
          // createdAt:currentTime,
          // updatedAt:currentTime
        },
        {
          appointment_statusid:3,
          name: "Treated",
          // createdAt:currentTime,
          // updatedAt:currentTime
        },
        {
          appointment_statusid:4,
          name: "Cancelled",
          // createdAt:currentTime,
          // updatedAt:currentTime
        },
        {
          appointment_statusid:5, 
          name: "Requested",
          // createdAt:currentTime,
          // updatedAt:currentTime
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  
    return queryInterface.bulkDelete("masterappointmentstatuses", {}, null);
  },
};
