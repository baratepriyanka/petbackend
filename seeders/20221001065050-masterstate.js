'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterstates",
      [
        {
          stateid: 1,
          name: "Maharashtra",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          stateid: 2,
          name: "Goa",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          stateid: 3,
          name: "Gujarat",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          stateid: 4,
          name: "Andhra Pradesh",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterstates", {}, null);

  }
};
