const tableNames = require('db/tableNames');
const {studentSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.STUDENT, addDateFields(Sequelize, studentSchema));

    await queryInterface.addIndex(tableNames.STUDENT, ['name']);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.STUDENT);
  }
};