'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.addColumn(
        'users', // table name
        'admin', // new field name
        {
          type: Sequelize.TINYINT(4),
          after: "user_type",
          comment: " 0 is for is_admin, 1 is for is_doctor"
        }),
       
       
    ],
    [
      queryInterface.addColumn(
       'users', // table name
       'department', // new field name
       {
         type: Sequelize.TINYINT(4),
         after: "admin",
        
       }),
      
      
   ]);
  },

  
  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'admin'),
      queryInterface.removeColumn('users', 'department'),
    
     
    ]);
  }
};