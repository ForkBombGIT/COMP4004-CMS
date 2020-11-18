const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {studentSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const student = sequelizeClient.define(tableNames.STUDENT, studentSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  student.associate = function(models) {
    student.belongsTo(models.administrator);
    student.belongsToMany(models.course, {through: models.enrolled, foreignKey: 'student_id'});
    student.belongsToMany(models.deliverable, {through: models.submits, foreignKey: 'student_id'});
  };

  return student;
};