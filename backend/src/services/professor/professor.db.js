const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {professorSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const professor = sequelizeClient.define(tableNames.PROFESSOR, professorSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  professor.associate = function(models) {
    professor.belongsToMany(models.course, {through: models.teaches, foreignKey: 'professorId'});
  };

  return professor;
};