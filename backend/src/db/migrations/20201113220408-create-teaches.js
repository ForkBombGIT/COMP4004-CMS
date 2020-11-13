const tableNames = require('db/tableNames');
const {teachesSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.TEACHES, addDateFields(Sequelize, teachesSchema));

    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.TEACHES, tableNames.PROFESSOR, 'professor_id');
    await foreignKeyAdder(tableNames.TEACHES, tableNames.COURSE, 'course_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.TEACHES);
  }
};