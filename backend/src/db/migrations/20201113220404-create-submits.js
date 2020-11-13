const tableNames = require('db/tableNames');
const {submitsSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.SUBMITS, addDateFields(Sequelize, submitsSchema));
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.SUBMITS, tableNames.STUDENT, 'student_id');
    await foreignKeyAdder(tableNames.SUBMITS, tableNames.DELIVERABLE, 'deliverable_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.SUBMITS);
  }
};