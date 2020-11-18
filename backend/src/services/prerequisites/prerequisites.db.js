const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {prerequisitesSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const prerequisites = sequelizeClient.define(tableNames.PREREQUISITES, prerequisitesSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  // eslint-disable-next-line
  prerequisites.associate = function(models) {
    // Need a new model coursePrereqs for this many to many relationship to work... 
    // prerequisites.belongsToMany(models.course, {through: models.coursePrereqs, foreignKey: 'prerequisite_id'});
  };

  return prerequisites;
};