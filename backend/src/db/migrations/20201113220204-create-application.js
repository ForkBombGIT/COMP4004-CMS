const tableNames = require('db/tableNames');
const {applicationSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.APPLICATION, addDateFields(Sequelize, applicationSchema));
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.APPLICATION);
  }
};