
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('opd_ipd_patient_media_types', 'patient_id', {
              type: Sequelize.STRING(20),
             
          })
      ],[
        queryInterface.changeColumn('opd_ipd_patient_media_types', 'opd_ipd_id', {
            type: Sequelize.STRING(20),
           
        })
    ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('opd_ipd_patient_media_types', 'patient_id', {
              type: DataTypes.STRING,
              
          })
      ],[
        queryInterface.changeColumn('opd_ipd_patient_media_types', 'opd_ipd_id', {
            type: DataTypes.STRING,
            
        })
    ])
  }
};