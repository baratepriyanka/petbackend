'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'opd_ipd_patient_media_types', // table name
        'img_url_type', // new field name
        {
          type: Sequelize.STRING,
          after: "s3_url"
        }),
       
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('opd_ipd_patient_media_types', 'img_url_type'),
      
    
     
    ]);
  }
};