'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'hospitals', // table name
        'hosp_id', // new field name
        {
          type: Sequelize.STRING,
          after: "id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('hospitals', 'hosp_id'),
    
     
    ]);
  }
};