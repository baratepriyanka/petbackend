'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masteruploadreports",
      [
        {
          report_type: 1,
          name: "Blood Test",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          report_type: 2,
          name: "MRI Test",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          report_type: 3,
          name: "X-ray Test",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masteruploadreports", {}, null);

  }
};
