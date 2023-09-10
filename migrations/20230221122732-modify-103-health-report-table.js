'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'healthreports', // table name
        'patient_id', // new field name
        {
          type: Sequelize.STRING(20),
          after: "id"
        }),
       
       
       
    ],
    [
      queryInterface.addColumn(
       'healthreports', // table name
       'contract_no', // new field name
       {
         type: Sequelize.STRING(20),
         after: "patient_id"
       }),
      
      
      
   ], );
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('healthreports', 'patient_id'),
      queryInterface.removeColumn('healthreports', 'contract_no'),
      
    
     
    ]);
  }
};