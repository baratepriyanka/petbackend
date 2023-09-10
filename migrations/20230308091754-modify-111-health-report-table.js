'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'healthreports', // table name
        'case_id', // new field name
        {
          type: Sequelize.STRING(20),
          after: "hospital_id"
        }),
       
       
       
    ],
     );
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('healthreports', 'case_id'),
     

    ]);
  }
};