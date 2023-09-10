'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'hospitals', // table name
        'statuss', // new field name
        {
          type: Sequelize.TINYINT(4),
          defaultValue: 0,
          comment: "0 is for active, 1 is for deleted, 2 is for inactive	",
          after: "phone"
        }),
       
       
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('hospitals', 'statuss'),
     
    ]);
  }
};