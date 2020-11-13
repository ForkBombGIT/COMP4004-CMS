const tableNames = require('db/tableNames');
const {studentsSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.STUDENTS, addDateFields(Sequelize, studentsSchema));

    await queryInterface.addIndex(tableNames.STUDENTS, ['name']);

    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.PROFESSOR, tableNames.ADMINISTRATOR, 'administrator_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.STUDENTS);
  }
};