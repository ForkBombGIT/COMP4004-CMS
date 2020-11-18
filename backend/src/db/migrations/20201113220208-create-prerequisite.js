const tableNames = require('db/tableNames');
const {prerequisiteSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.PREREQUISITE, addDateFields(Sequelize, prerequisiteSchema));
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.PREREQUISITE);
  }
};