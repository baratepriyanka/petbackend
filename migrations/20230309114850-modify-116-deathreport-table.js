
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('deathreports', 'date_of_release', {
              type: Sequelize.DATE,
             
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('deathreports', 'date_of_release', {
              type: DataTypes.STRING,
              
          })
      ])
  }
};