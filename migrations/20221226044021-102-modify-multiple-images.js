'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'images', // table name
        'profileid', // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 0,
          after: "profile",
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('images', 'profileid'),
     
    ]);
  }
};