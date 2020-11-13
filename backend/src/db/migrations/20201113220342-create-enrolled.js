const tableNames = require('db/tableNames');
const {enrolledSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.ENROLLED, addDateFields(Sequelize, enrolledSchema));
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.ENROLLED, tableNames.STUDENT, 'student_id');
    await foreignKeyAdder(tableNames.ENROLLED, tableNames.COURSE, 'course_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.ENROLLED);
  }
};