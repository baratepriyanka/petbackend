module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.changeColumn("CaseManagers", "date", {
          type: Sequelize.DATEONLY ,
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("CaseManagers", "date", {
        type: DataTypes.DATE,
      }),
    ]);
  },
};
