'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterspecies",
      [
        {
          speciesid: 1,
          name: "Canis lupus",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          speciesid: 2,
          name: "Short Hair",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          speciesid: 3,
          name: "Long Hair",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterspecies", {}, null);

  }
};
