
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('opd_ipds', 'patient_id', {
              type: Sequelize.STRING(20),
             
          })
      ],[
        queryInterface.changeColumn('opd_ipds', 'type_id', {
            type: Sequelize.STRING(20),
           
        })
    ],[
      queryInterface.changeColumn('opd_ipds', 'hospital_id', {
          type: Sequelize.STRING(20),
         
      })
  ],[
    queryInterface.changeColumn('opd_ipds', 'date', {
        type: Sequelize.DATE,
       
    })
])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('opd_ipds', 'patient_id', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('opd_ipds', 'type_id', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('opd_ipds', 'hospital_id', {
          type: DataTypes.STRING,
          
      })
  ],[
    queryInterface.changeColumn('opd_ipds', 'date', {
        type: DataTypes.STRING,
        
    })
])
  }
};