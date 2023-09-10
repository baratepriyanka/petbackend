'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'beds', // table name
        'bedid', // new field name
        {
          type: Sequelize.STRING,
          after: "bedcategory"
        }),
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('beds', 'bedid')
    ]);
  }
};
