'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'Patients', // table name
        'discharge_death_status', // new field name
        {
          type: Sequelize.TINYINT(4),
          after: "status",
          defaultValue: 0,
          comment: "1 is for discharge report , 2 is for death report"
        
        }),
       
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('Patients', 'discharge_death_status'),
      
    
     
    ]);
  }
};