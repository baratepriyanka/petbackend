
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('appointments', 'date', {
              type: Sequelize.DATE,
             
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('appointments', 'date', {
              type: DataTypes.STRING,
              
          })
      ])
  }
};