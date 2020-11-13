const tableNames = require('db/tableNames');
const {deliverableSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.DELIVERABLE, addDateFields(Sequelize, deliverableSchema));
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.DELIVERABLE, tableNames.COURSE, 'course_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.DELIVERABLE);
  }
};