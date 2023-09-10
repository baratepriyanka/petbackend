module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      
      [
        queryInterface.changeColumn("Medicines", "purchase_price", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "sale_price", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "quantity", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "exp_date", {
          type: Sequelize.DATEONLY ,
        }),
      ],
     
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Medicines", "purchase_price", {
        type: DataTypes.INTEGER,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "sale_price", {
        type: DataTypes.INTEGER,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "quantity", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "exp_date", {
        type: DataTypes.DATE,
      }),
    ]);
  },
};
