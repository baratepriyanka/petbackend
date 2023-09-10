'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'healthreports', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING(20),
          after: "id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('healthreports', 'hospital_id'),
     
    ]);
  }
};