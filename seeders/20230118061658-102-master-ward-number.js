'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterwardnumbers",
      [
        {
          ward_no: "A",
          value: "a",
        
        },
        {
          ward_no: "B",
          value: "b",
        
        },
        {
          ward_no: "C",
          value: "c",
        
        },
        {
          ward_no: "D",
          value: "d",
        
        },
        {
          ward_no: "E",
          value: "e",
        
        },
        {
          ward_no: "F",
          value: "f",
        
        },
        {
          ward_no: "G",
          value: "g",
        
        },
        {
          ward_no: "H",
          value: "h",
        
        },
        {
          ward_no: "I",
          value: "i",
        
        },
        {
          ward_no: "J",
          value: "j",
        
        },
        
       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterwardnumbers", {}, null);

  }
};
