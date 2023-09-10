module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.changeColumn("appointments", "appointment_id", {
          type: Sequelize.STRING(20) ,
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("appointments", "appointment_id", {
        type: DataTypes.TINYINT(4),
      }),
    ]);
  },
};
