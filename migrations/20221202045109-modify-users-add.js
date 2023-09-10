'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'hospital_name', // new field name
        {
          type: Sequelize.STRING,
          after: "hos_id"
        }),
        queryInterface.addColumn(
          'users', // table name
          'city', // new field name
          {
            type: Sequelize.STRING,
            after: "hospital_name"
          }), 
          queryInterface.addColumn(
            'users', // table name
            'state', // new field name
            {
              type: Sequelize.STRING,
              after: "city"
            }),
            queryInterface.addColumn(
              'users', // table name
              'address', // new field name
              {
                type: Sequelize.STRING,
                after: "state"
              }),
       
            
    ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
    
      queryInterface.removeColumn('users', 'hospital_name'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'state'),
      queryInterface.removeColumn('users', 'address'),
     
    ]);
  }
};