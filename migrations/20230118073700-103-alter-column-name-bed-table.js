// 'use strict';

// module.exports = {
//   up: async (queryInterface, DataTypes) => {
//     await queryInterface.renameColumn('beds', 'bednumber ', 'ward_no')
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.renameColumn('beds', 'ward_no')
//   }
// };
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('beds', 'bednumber', 'ward_no');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('beds', 'ward_no', 'bednumber');
  }
};