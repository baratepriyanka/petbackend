
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('hospitals', 'hosp_id', {
              type: Sequelize.STRING(20),
             
          })
      ],
      [
        queryInterface.changeColumn('hospitals', 'user_id', {
            type: Sequelize.STRING(20),
           
        })
    ],[
      queryInterface.changeColumn('hospitals', 'phone', {
          type: Sequelize.STRING(50),
         
      })
  ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('hospitals', 'hosp_id', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('hospitals', 'user_id', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('hospitals', 'phone', {
          type: DataTypes.STRING,
          
      })
  ])
  }
};