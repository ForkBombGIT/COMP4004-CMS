const tableNames = require('db/tableNames');
const {professorSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.PROFESSOR, addDateFields(Sequelize, professorSchema));

    await queryInterface.addIndex(tableNames.PROFESSOR, ['name']);

    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.PROFESSOR, tableNames.ADMINISTRATOR, 'administrator_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.PROFESSOR);
  }
};