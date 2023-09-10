'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'user_type', // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 2,
          after: "password"
        }),
       
    
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'user_type'),  
      
    
     
    ]);
  }
};