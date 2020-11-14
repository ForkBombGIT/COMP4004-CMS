const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {teachesSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const teaches = sequelizeClient.define(tableNames.TEACHES, teachesSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  teaches.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return teaches;
};