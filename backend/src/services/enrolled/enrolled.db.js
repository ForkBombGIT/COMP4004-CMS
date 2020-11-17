const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {enrolledSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const enrolled = sequelizeClient.define(tableNames.ENROLLED, enrolledSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  enrolled.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return enrolled;
};