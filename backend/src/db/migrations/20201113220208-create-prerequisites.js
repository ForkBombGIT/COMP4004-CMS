const tableNames = require('db/tableNames');
const {prerequisitesSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.PREREQUISITES, addDateFields(Sequelize, prerequisitesSchema));
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.PREREQUISITES, tableNames.COURSE, 'course_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.PREREQUISITES);
  }
};