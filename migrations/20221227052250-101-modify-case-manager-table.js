'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'CaseManagers', // table name
        'hospital_id', // new field name
        {
          type: Sequelize.STRING,
          after: "id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('CaseManagers', 'hospital_id'),
    
     
    ]);
  }
};