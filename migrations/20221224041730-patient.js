'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      patient_name: {
        maxLength: 50,
        type: Sequelize.STRING
      },
      patient_id: {
        type: Sequelize.STRING
      },
      email: {
        
        type: Sequelize.STRING
      },
      phone: {
     
        type: Sequelize.STRING
      },
      password: {
       
        type: Sequelize.STRING
      },
      profile: {
       
        type: Sequelize.STRING
      },
      s3image:{
        type: Sequelize.STRING
      },
      address: {
       
        type: Sequelize.STRING
      },
      gender:{
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      doctor_id: {
        type: Sequelize.BIGINT
      },
      bloodgroup: {
        type: Sequelize.STRING
      },
      added_from: {
        type: Sequelize.STRING
      },

      parent_name: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      cage_kennel:{
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      reg_no: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.STRING
      },
      bill_no: {
        type: Sequelize.STRING
      },
      ward_no: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      xray: {
        type: Sequelize.STRING
      },
      diagnosis: {
        type: Sequelize.STRING
      },
      cage_id: {
        type: Sequelize.STRING
      },
     
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
        comment: "0 is for active, 1 is for deleted, 2 is for inactive	"
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },


  
  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Patients');
  }
};
