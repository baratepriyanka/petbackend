
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.changeColumn('consents', 'hospital_id', {
              type: Sequelize.STRING(20),
             
          })
      ],
      [
        queryInterface.changeColumn('consents', 'contractNo', {
            type: Sequelize.STRING(50),
           
        })
    ], [
      queryInterface.changeColumn('consents', 'breed', {
          type: Sequelize.TINYINT(4).UNSIGNED,
         
      })
  ],
  [
    queryInterface.changeColumn('consents', 'species', {
      type: Sequelize.TINYINT(4).UNSIGNED,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'color', {
      type: Sequelize.TINYINT(4).UNSIGNED,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'age', {
      type: Sequelize.TINYINT(4).UNSIGNED,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'genderid', {
      type: Sequelize.TINYINT(4).UNSIGNED,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'idNo', {
      type: Sequelize.TINYINT(4).UNSIGNED,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'vehicleNo', {
        type: Sequelize.STRING(20),
       
    })
  ],[
    queryInterface.changeColumn('consents', 'dateOfAdmission', {
        type: Sequelize.DATE,
       
    })
  ],[
    queryInterface.changeColumn('consents', 'time', {
      type: Sequelize.STRING(20),
       
    })
  ])
    },
  
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('consents', 'hospital_id', {
                type: DataTypes.STRING,
                
            })
        ],
        [
          queryInterface.changeColumn('consents', 'contractNo', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('consents', 'dateOfAdmission', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('consents', 'breed', {
          type: DataTypes.STRING,
          
      })
  ],[
    queryInterface.changeColumn('consents', 'species', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'color', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'age', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'genderid', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'time', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'idNo', {
        type: DataTypes.STRING,
        
    })
  ],[
    queryInterface.changeColumn('consents', 'vehicleNo', {
        type: DataTypes.STRING,
        
    })
  ])
    }
  };