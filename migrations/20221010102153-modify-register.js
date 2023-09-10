'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'profile', // new field name
        {
          type: Sequelize.STRING,
          after: "password"
        }),
        queryInterface.addColumn(
          'users', // table name
          's3image', // new field name
          {
            type: Sequelize.STRING,
            after: "profile"
          }
        ),
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'profile'),
      queryInterface.removeColumn('users', 's3image')
    ]);
  }
};