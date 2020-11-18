const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {administratorSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const administrator = sequelizeClient.define(tableNames.ADMINISTRATOR, administratorSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  administrator.associate = function(models) {
    administrator.hasMany(models.application, {foreignKey: 'administratorId'});
  };

  return administrator;
};