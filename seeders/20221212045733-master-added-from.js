'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masteraddedfroms",
      [
        {
          added_from: 1,
          name: "opd",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          added_from: 2,
          name: "ipd",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masteraddedfroms", {}, null);

  }
};
