'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'hospitals', // table name
        'user_id', // new field name
        {
          type: Sequelize.STRING,
          after: "hosp_id"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('hospitals', 'user_id'),
    
     
    ]);
  }
};