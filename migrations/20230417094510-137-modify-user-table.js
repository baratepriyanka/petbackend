'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'token', // new field name
        {
          type: Sequelize.STRING(100),
          after: "address",
          
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'token'),
  
    
     
    ]);
  }
};