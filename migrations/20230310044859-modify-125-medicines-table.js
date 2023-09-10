module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.changeColumn("Medicines", "hospital_id", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "Patient_id", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "purchase_price", {
          type: Sequelize.INTEGER(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "sale_price", {
          type: Sequelize.INTEGER(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "bloodgroup", {
          type: Sequelize.TINYINT(4).UNSIGNED,
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "doctor_id", {
          type: Sequelize.STRING(20),
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "exp_date", {
          type: Sequelize.DATE,
        }),
      ],
      [
        queryInterface.changeColumn("Medicines", "category", {
          type: Sequelize.TINYINT(4).UNSIGNED,
        }),
      ],
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Medicines", "hospital_id", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "Patient_id", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "purchase_price", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "sale_price", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "bloodgroup", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "doctor_id", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "exp_date", {
        type: DataTypes.STRING,
      }),
    ],[
      queryInterface.changeColumn("Medicines", "category", {
        type: DataTypes.STRING,
      }),
    ]);
  },
};
