module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.changeColumn("opd_ipds", "date", {
          type: Sequelize.DATEONLY ,
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("opd_ipds", "date", {
        type: DataTypes.DATE,
      }),
    ]);
  },
};
