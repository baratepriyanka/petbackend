'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'usermanagements', // table name
        'password', // new field name
        {
          type: Sequelize.STRING,
          after: "user_id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('usermanagements', 'password'),
     
    ]);
  }
};