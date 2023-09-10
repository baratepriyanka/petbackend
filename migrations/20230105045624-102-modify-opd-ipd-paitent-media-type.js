'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'opd_ipd_patient_media_types', // table name
        's3_url', // new field name
        {
          type: Sequelize.STRING,
          after: "url"
        }),
       
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('opd_ipd_patient_media_types', 's3_url'),
      
    
     
    ]);
  }
};