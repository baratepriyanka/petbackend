module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      
      [
        queryInterface.changeColumn("opd_ipds", "temperature", {
          type: Sequelize.STRING(500),
        }),
      ],
      [
        queryInterface.changeColumn("opd_ipds", "feeding", {
          type: Sequelize.STRING(500),
        }),
      ],
      [
        queryInterface.changeColumn("opd_ipds", "clinical_observ", {
          type: Sequelize.STRING(500),
        }),
      ],
      [
        queryInterface.changeColumn("opd_ipds", "treatment_medicine", {
          type: Sequelize.STRING(500),
        }),
      ], [
        queryInterface.changeColumn("opd_ipds", "case_history", {
          type: Sequelize.STRING(500),
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("opd_ipds", "temperature", {
        type: DataTypes.STRING(),
      }),
    ],[
      queryInterface.changeColumn("opd_ipds", "feeding", {
        type: DataTypes.STRING(),
      }),
    ],[
      queryInterface.changeColumn("opd_ipds", "clinical_observ", {
        type: DataTypes.STRING(),
      }),
    ],[
      queryInterface.changeColumn("opd_ipds", "treatment_medicine", {
        type: DataTypes.STRING(),
      }),
    ],[
      queryInterface.changeColumn("opd_ipds", "case_history", {
        type: DataTypes.STRING(),
      }),
    ]);
  },
};
