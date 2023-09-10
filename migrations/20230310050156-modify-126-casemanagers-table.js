
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('CaseManagers', 'date', {
              type: Sequelize.DATE,
             
          })
      ],
      [
        queryInterface.changeColumn('CaseManagers', 'patient', {
            type: Sequelize.STRING(20),
           
        })
    ],
    [
      queryInterface.changeColumn('CaseManagers', 'hospital_id', {
          type: Sequelize.STRING(20),
         
      })
  ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('CaseManagers', 'date', {
              type: DataTypes.STRING,
              
          })
      ],
      [
        queryInterface.changeColumn('CaseManagers', 'patient', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('CaseManagers', 'hospital_id', {
          type: DataTypes.STRING,
          
      })
  ])
  }
};