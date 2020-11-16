const tableNames = require('db/tableNames');
const {studentSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.STUDENT, addDateFields(Sequelize, studentSchema));

    await queryInterface.addIndex(tableNames.STUDENT, ['name']);

    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.STUDENT, tableNames.ADMINISTRATOR, 'administrator_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.STUDENT);
  }
};