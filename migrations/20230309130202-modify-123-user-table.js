
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('users', 'user_id', {
              type: Sequelize.STRING(20),
             
          })
      ],[
        queryInterface.changeColumn('users', 'phone', {
            type: Sequelize.STRING(50),
           
        })
    ],[
      queryInterface.changeColumn('users', 'hospital_id', {
          type: Sequelize.STRING(20),
         
      })
  ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('users', 'user_id', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('users', 'phone', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('users', 'hospital_id', {
          type: DataTypes.STRING,
          
      })
  ])
  }
};