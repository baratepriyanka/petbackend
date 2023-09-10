
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
  queryInterface.changeColumn('Patients', 'city', {
    type: Sequelize.STRING(5),
     
  })
],[
  queryInterface.changeColumn('Patients', 'state', {
    type: Sequelize.STRING(5),
     
  })
],[
  queryInterface.changeColumn('Patients', 'pincode', {
    type: Sequelize.STRING(10),
     
  })
])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
  queryInterface.changeColumn('Patients', 'city', {
      type: DataTypes.TINYINT(4).UNSIGNED,
      
  })
],[
  queryInterface.changeColumn('Patients', 'state', {
      type: DataTypes.TINYINT(4).UNSIGNED,
      
  })
],[
  queryInterface.changeColumn('Patients', 'pincode', {
      type: DataTypes.INTEGER(20).UNSIGNED,
      
  })
])
  }
};