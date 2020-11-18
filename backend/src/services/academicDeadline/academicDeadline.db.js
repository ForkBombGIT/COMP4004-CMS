const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {academicDeadlineSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const academicDeadline = sequelizeClient.define(tableNames.ACADEMIC_DEADLINE, academicDeadlineSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  academicDeadline.associate = function(models) {
    academicDeadline.belongsTo(models.course);
  };

  return academicDeadline;
};