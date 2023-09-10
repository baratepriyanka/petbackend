'use strict';

module.exports = {

  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'Patients', // table name
        'dateofadmission', // new field name
        {
          type: Sequelize.STRING,
          after: "address"
        }),
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('Patients', 'dateofadmission'),
     
    ]);
  }
};