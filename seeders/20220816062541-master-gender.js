'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
      return queryInterface.bulkInsert('mastergenders',
       [  
          {
            genderid: 1,
            name: 'Male',
            // createdAt: currentTime,
            // updatedAt: currentTime,
          },
          {
            genderid : 2,
            name: 'Female',
            // createdAt: currentTime,
            // updatedAt: currentTime,
          }, 
          {
            genderid : 3,
            name: 'Other',
            // createdAt: currentTime,
            // updatedAt: currentTime,
          },
           

        ], 
          {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('mastergenders',{},null);
  }
};
