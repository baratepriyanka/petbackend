'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'ipdPatientMores', // table name
        'added_type', // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 1,
          after: "case_history"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('ipdPatientMores', 'added_type'),  
    
     
    ]);
  }
};