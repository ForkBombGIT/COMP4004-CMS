const tableNames = require('db/tableNames');
const {professorSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.PROFESSOR, addDateFields(Sequelize, professorSchema));

    await queryInterface.addIndex(tableNames.PROFESSOR, ['name']);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.PROFESSOR);
  }
};