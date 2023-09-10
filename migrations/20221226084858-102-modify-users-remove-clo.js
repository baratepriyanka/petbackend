'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('users', 'hos_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'hos_id', {
      type: Sequelize.STRING,
     
     
    })
  },
};

// function sleep() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 5000);
//   });
// }