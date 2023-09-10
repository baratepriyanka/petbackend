'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'ipdPatientMores', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING,
          after: "ipdId"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('ipdPatientMores', 'hospital_id'),  
    
     
    ]);
  }
};