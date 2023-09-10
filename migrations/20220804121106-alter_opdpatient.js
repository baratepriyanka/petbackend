'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'opdpatients', // table name
        'patient_id', // new field name
        {
          type: Sequelize.STRING,
          after: "patient_age"
        }),
       ,
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('opdpatients', 'patient_id'),
      
    ]);
  }
};
