'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterages",
      [
        {
          age: "1",
        
        },
        {
          age: "2",
        
        },
        {
          age: "3",
        
        },
        {
          age: "4",
        
        },
        {
          age: "5",
        
        },
        {
          age: "6",
        
        },
        {
          age: "7",
        
        },
        {
          age: "8",
        
        },
        {
          age: "9",
        
        },
        {
          age: "10",
        
        },
        {
          age: "11",
        
        }, {
          age: "12",
        
        }, {
          age: "13",
        
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterages", {}, null);

  }
};
