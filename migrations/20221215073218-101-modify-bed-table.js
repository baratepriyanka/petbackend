'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'beds', // table name
        'in_used', // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 0,
          after: "description"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('beds', 'in_used'),
     
    ]);
  }
};