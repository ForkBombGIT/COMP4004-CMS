const tableNames = require('db/tableNames');
const {administratorSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.ADMINISTRATOR, addDateFields(Sequelize, administratorSchema));

    await queryInterface.addIndex(tableNames.ADMINISTRATOR, ['name']);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.ADMINISTRATOR);
  }
};