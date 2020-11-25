const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {courseSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const course = sequelizeClient.define(tableNames.COURSE, courseSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  course.associate = function(models) {
    course.belongsToMany(models.student, {through: models.enrolled, foreignKey: 'courseId'});
    course.belongsTo(models.professor);
    course.hasMany(models.prerequisite, {foreignKey: 'courseId'});
    course.hasMany(models.deliverable, {foreignKey: 'courseId'});
    course.hasMany(models.academicDeadline, {foreignKey: 'courseId'});
  };

  return course;
};