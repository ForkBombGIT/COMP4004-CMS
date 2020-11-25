const tableNames = require('db/tableNames');
const {courseSchema} = require('db/schemas');
const {addDateFields, addForeignKey} = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableNames.COURSE, addDateFields(Sequelize, courseSchema));

    await queryInterface.addIndex(tableNames.COURSE, ['name']);
    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.COURSE, tableNames.PROFESSOR, 'professor_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.COURSE);
  }
};