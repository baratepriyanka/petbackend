'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'ipdPatientMores', // table name
        'case_history', // new field name
        {
          type: Sequelize.STRING,
          after: "treatment"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('ipdPatientMores', 'case_history'),  
    
     
    ]);
  }
};