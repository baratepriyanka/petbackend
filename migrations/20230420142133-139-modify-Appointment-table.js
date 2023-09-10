'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'appointments', // table name
        'appointment_id', // new field name
        {
          type: Sequelize.TINYINT(4),
          
          after: "hospital_id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('appointments', 'appointment_id'),
     
    ]);
  }
};