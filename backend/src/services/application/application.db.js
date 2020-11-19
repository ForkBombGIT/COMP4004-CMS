const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {applicationSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const application = sequelizeClient.define(tableNames.APPLICATION, applicationSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  // application.associate = function(models) {
  //   application.belongsTo(models.administrator);
  // };

  return application;
};