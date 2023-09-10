
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Patients', 'hospital_id', {
              type: Sequelize.STRING(20),
             
          })
      ],[
        queryInterface.changeColumn('Patients', 'dateofadmission', {
            type: Sequelize.DATE,
           
        })
    ],[
      queryInterface.changeColumn('Patients', 'patient_id', {
        type: Sequelize.STRING(20),
         
      })
  ],[
    queryInterface.changeColumn('Patients', 'phone', {
      type: Sequelize.STRING(50),
       
    })
],[
  queryInterface.changeColumn('Patients', 'gender', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'breed', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'color', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'species', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'city', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'state', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'pincode', {
    type: Sequelize.INTEGER(20).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'cage_kennel', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'category', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'reg_no', {
    type: Sequelize.STRING(20),
     
  })
],[
  queryInterface.changeColumn('Patients', 'fee', {
    type: Sequelize.STRING(20),
     
  })
],[
  queryInterface.changeColumn('Patients', 'bill_no', {
    type: Sequelize.STRING(20)
     
  })
],[
  queryInterface.changeColumn('Patients', 'ward_no', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'age', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
],[
  queryInterface.changeColumn('Patients', 'weight', {
    type: Sequelize.TINYINT(4),
     
  })
],[
  queryInterface.changeColumn('Patients', 'cage_id', {
    type: Sequelize.TINYINT(4).UNSIGNED,
     
  })
])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Patients', 'hospital_id', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('Patients', 'dateofadmission', {
            type: DataTypes.STRING,
            
        })
    ],[
      queryInterface.changeColumn('Patients', 'patient_id', {
          type: DataTypes.STRING,
          
      })
  ],[
    queryInterface.changeColumn('Patients', 'phone', {
        type: DataTypes.STRING,
        
    })
],[
  queryInterface.changeColumn('Patients', 'gender', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'breed', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'color', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'species', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'city', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'state', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'pincode', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'cage_kennel', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'category', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'reg_no', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'fee', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'bill_no', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'ward_no', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'age', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'weight', {
      type: DataTypes.STRING,
      
  })
],[
  queryInterface.changeColumn('Patients', 'cage_id', {
      type: DataTypes.STRING,
      
  })
])
  }
};