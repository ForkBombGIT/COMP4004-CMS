const tableNames = require('db/tableNames');
const {courseSchema} = require('db/schemas');
const {addDateFields} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.COURSE, addDateFields(Sequelize, courseSchema));

    await queryInterface.addIndex(tableNames.COURSE, ['name']);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.COURSE);
  }
};