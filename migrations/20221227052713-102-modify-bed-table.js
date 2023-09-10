'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'beds', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING,
          after: "id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('beds', 'hospital_id'),
     
    ]);
  }
};