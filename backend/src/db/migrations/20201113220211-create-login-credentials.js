const tableNames = require('db/tableNames');
const { loginCredentialSchema } = require('db/schemas');
const { addDateFields, addForeignKey } = require('db/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      tableNames.LOGIN_CREDENTIAL,
      addDateFields(Sequelize, loginCredentialSchema)
    );

    const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
    await foreignKeyAdder(tableNames.LOGIN_CREDENTIAL, tableNames.PROFESSOR, 'professor_id');
    await foreignKeyAdder(tableNames.LOGIN_CREDENTIAL, tableNames.ADMINISTRATOR, 'administrator_id');
    await foreignKeyAdder(tableNames.LOGIN_CREDENTIAL, tableNames.STUDENT, 'student_id');
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableNames.LOGIN_CREDENTIAL);
  },
}; 