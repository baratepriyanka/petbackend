'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'hos_id', // new field name
        {
          type: Sequelize.STRING,
          after: "s3image"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'hos_id'),
     
    ]);
  }
};