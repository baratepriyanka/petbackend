'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'usermanagements', // table name
        'user_id', // new field name
        {
          type: Sequelize.STRING,
          after: "role"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('usermanagements', 'user_id'),
     
    ]);
  }
};