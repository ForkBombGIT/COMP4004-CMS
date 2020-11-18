const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {prerequisiteSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const prerequisite = sequelizeClient.define(tableNames.PREREQUISITE, prerequisiteSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  prerequisite.associate = function(models) {
    prerequisite.belongsTo(models.course);
  };

  return prerequisite;
};