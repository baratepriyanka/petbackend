module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.changeColumn("appointments", "date", {
          type: Sequelize.DATEONLY ,
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("appointments", "date", {
        type: DataTypes.DATE,
      }),
    ]);
  },
};
