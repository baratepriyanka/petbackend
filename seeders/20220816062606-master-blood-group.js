"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterbloodgroups",
      [
        {
          bloodgroupid:1,
          name: "A+",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:2,
          name: "A-",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:3,
          name: "B+",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:4,
          name: "B-",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:5,
          name: "AB+",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:6,
          name: "AB-",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:7,
          name: "O+",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          bloodgroupid:8,
          name: "O-",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("masterbloodgroups", {}, null);
  },
};
 