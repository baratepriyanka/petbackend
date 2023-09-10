'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'opd_ipd_patient_media_types', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING(20),
          after: "patient_id"
        }),
       
       
       
    ],[
      queryInterface.addColumn(
       'opd_ipd_patient_media_types', // table name
       'case_id', // new field name
       {
         type: Sequelize.STRING(20),
         after: "hospital_id"
       }),
      
      
      
   ]
     );
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('opd_ipd_patient_media_types', 'hospital_id'),
      queryInterface.removeColumn('opd_ipd_patient_media_types', 'case_id'),

    ]);
  }
};