
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn('clinicmanagements', 'phone', {
            type: Sequelize.STRING(50),
           
        })
    ],
    [
      queryInterface.changeColumn('clinicmanagements', 'hospital_id', {
          type: Sequelize.STRING(20),
         
      })
  ], [
    queryInterface.changeColumn('clinicmanagements', 'status', {
        type: Sequelize.TINYINT(4),
       
    })
])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('clinicmanagements', 'date', {
              type: DataTypes.STRING,
              
          })
      ],
      [
        queryInterface.changeColumn('clinicmanagements', 'patient', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('clinicmanagements', 'hospital_id', {
          type: DataTypes.STRING,
          
      })
  ])
  }
};