'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'phone', // new field name
        {
          type: Sequelize.STRING,
          after: "email"
        }),
       
    
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'phone'),  
      
    
     
    ]);
  }
};