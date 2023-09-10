"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const currentTime = new Date(new Date().toUTCString()).toISOString();
    return queryInterface.bulkInsert(
      "masterdepartments",
      [
        {
          departmentid:1,
          name: "Cardiology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:2,
          name: "Diagnostic imaging",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:3,
          name: "Ear nose and throat(ENT)",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:4,
          name: "General surgery",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {departmentid:5,
          name: "Maternity department",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:6,
          name: "Microbiology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:7,
          name: "Nephrology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:8,
          name: "Neurology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:9,
          name: "Nutrition and Dietetics",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:10,
          name: "Occupational therapy",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:11,
          name: "Oncology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:12,
          name: "Ophthalmology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:13,
          name: "Pain management clinics",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:14,
          name: "Physiotherapy",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:15,
          name: "Radiotherapy",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:16,
          name: "Renal unit",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:17,
          name: "Rheumatology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:18,
          name: "Sexual health(genitourinary Medicine)",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:19,
          name: "Urology",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
        {
          departmentid:20,
          name: "Department Name 1",
          // createdAt: currentTime,
          // updatedAt: currentTime,
        },
      ],
      {}
    );
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("master-departments", {}, null);
  },
};
