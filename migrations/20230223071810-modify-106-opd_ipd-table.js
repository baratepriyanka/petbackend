'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'opd_ipds', // table name
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
    
      queryInterface.removeColumn('opd_ipds', 'case_id'),

    ]);
  }
};