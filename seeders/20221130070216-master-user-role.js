'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masteruserroles",
      [
        {
          value: 1,
          type: "Is_Doctor",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          value: 0,
          type: "Is_Admin",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masteruserroles", {}, null);

  }
};
