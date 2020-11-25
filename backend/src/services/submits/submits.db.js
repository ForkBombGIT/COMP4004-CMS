const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {submitsSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const submits = sequelizeClient.define(tableNames.SUBMITS, submitsSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  // eslint-disable-next-line no-unused-vars
  submits.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return submits;
};