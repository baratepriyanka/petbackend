
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('appointments', 'doctor', 'user_id',{
      comment: "user_id means doctor name"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('appointments', 'user_id', 'doctor');
  }
};
