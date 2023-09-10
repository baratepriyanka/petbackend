'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'user_id', // new field name
        {
          type: Sequelize.STRING,
          after: "id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'user_id'),
    
     
    ]);
  }
};