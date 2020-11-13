const tableNames = require('db/tableNames');
const {academicDeadlineSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.ACADEMIC_DEADLINE, addDateFields(Sequelize, academicDeadlineSchema));
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.ACADEMIC_DEADLINE, tableNames.COURSE, 'course_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.ACADEMIC_DEADLINE);
  }
};