
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('images', 'profileid', {
              type: Sequelize.STRING(20),
             
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('images', 'profileid', {
              type: DataTypes.STRING,
              
          })
      ])
  }
};