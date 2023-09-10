"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterbreeds",
      [
        {
          breedid: 1,
          name: "Persian",        
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          breedid: 2,
          name: "Himalayin",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },    
        {
          breedid: 3,
          name: "Boxer",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },    
        {
          breedid: 4,
          name: "Chippiparai",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },    
        {
          breedid: 5,
          name: "Indian Pariah Dog",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },    
        {
          breedid: 6,
          name: "Bull Dog",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        }, 
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterbreeds", {}, null);
  },
};
