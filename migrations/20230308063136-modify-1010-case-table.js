'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'case_tables', // table name
        'health_id', // new field name
        {
          type: Sequelize.STRING(20),
          after: "case_id"
        }),
       
       
       
    ],
     );
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('case_tables', 'health_id'),
     

    ]);
  }
};