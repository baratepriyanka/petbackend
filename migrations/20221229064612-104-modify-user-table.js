'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING,
          after: "user_id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'hospital_id'),  
    
     
    ]);
  }
};